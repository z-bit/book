import { Injectable, bind } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Thread, Message } from '../models';
import { MessagesService } from './messages.service';
import * as _ from 'underscore';

@Injectable()
export class ThreadsService {
    // most up to date list of threads
    threads: Observable<{ [key: string]: Thread }>;

    // a newest-first chronological list of threads
    orderedThreads: Observable<Thread[]>;

    // currently selected thread
    currentThread: Subject<Thread> = new BehaviorSubject(new Thread());

    // the set of messages for the currently selected thread
    currentThreatMesssages: Observable<Message[]>;

    constructor(
        public messagesService: MessagesService
    ) {
        this.threads = messagesService.messages.map(
            (messages: Message[]) => {
                let threads: {[key:string]: Thread} = {};

                // store the message's thread in threads:
                messages.map(
                    (message: Message) => {
                        threads[message.thread.id] = threads[message.thread.id] || message.thread;

                        // cache the most recent m message for each thread
                        let messagesThread = threads[message.thread.id];
                        if (!messagesThread.lastMessage ||
                             messagesThread.lastMessage.sentAt < message.sentAt) {
                            messagesThread.lastMessage = message;
                        }
                    }
                );
                return threads;
            }
        );
        this.orderedThreads = this.threads.map(
            (threadGroups: {[key: string]: Thread}) => {
                let threads: Thread[] = _.values(threadGroups);
                return _.sortBy(threads, (t: Thread) => t.lastMessage.sentAt)
                        .reverse()
                ;
            }
        );
        this.currentThreatMesssages = this.currentThread.combineLatest(
            messagesService.messages,
            (currentThread: Thread, messages: Message[]) => {
                if (currentThread && messages.length > 0) {
                    return _
                        .chain(messages)
                        .filter(
                            (message: Message) => (message.thread.id === currentThread.id)
                        )
                        .map(
                            (message: Message) => {
                                message.isRead = true;
                                return message;
                            }
                        )
                        .value()
                    ;
                } else {
                    return [];
                }
            }
        );
        this.currentThread.subscribe(this.messagesService.markThreadAsRead);
    }

    setCurrentThread(newThread: Thread): void {
        this.currentThread.next(newThread);
    }
}

export var threadsServiceInjectables: Array<any> = [
    bind(ThreadsService).toClass(ThreadsService);
];
