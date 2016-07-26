import { Injectable, bind } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { Message, Thread, User } from '../models';

let initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
    (messages: Message[]): Message[];
}

@Injectable()
export class MessagesService {
    // a stream that publishes new message only once
    newMessages: Subject<Message> = new Subject<Message>();

    // a stream that emits an array of most up to date messages
    messages: Observable<Message[]>;

    // receives _operations_ to be applied tp messages, performs changes on all messages
    // (that are currently in the messages stream
    updates: Subject<any> = new Subject<any>();

    // action streams
    create: Subject<Message> = new Subject<Message>();
    markThreadAsRead: Subject<any> = new Subject<any>();

    constructor() {
        this.messages =
            this.updates
                .scan(
                    (messages: Message[], operation: IMessagesOperation) => {
                        return operation(messages);
                    },
                    initialMessages
                )

                // make sure to share most recent list messages across anyone
                // who is interested in subscribing to the last knon list of messages
                .publishReplay(1)
                .refCount()
        ;

        this.create
            .map(
                function(message: Message): IMessagesOperation {
                    return (messages: Message[]) => {
                        return messages.concat(message);
                    };
                }
            )
            .subscribe(this.updates)
        ;

        this.newMessages.subscribe(this.create);

        this.markThreadAsRead
            .map(
                (thread: Thread) => {
                    return (messages: Message[]) => {
                        return messages.map(
                            (message: Message) => {
                                if (message.thread.id === thread.id) {
                                    message.isRead = true;
                                }
                                return message;
                            }
                        );
                    };
                }
            )
            .subscribe(this.updates)
        ;
    }

    addMessage(message: Message): void {
        this.newMessages.next(message);
    }

    messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
        return this.newMessages.filter(
            (message: Message) => {
                return (message.thread.id === thread.id) && (message.author.id !== user.id);
            }
        );
    }
}

export var messagesServiceInjectables: Array<any> = [
    bind(MessagesService).toClass(MessagesService)
];
