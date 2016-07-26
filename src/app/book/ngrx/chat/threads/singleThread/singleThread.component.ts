import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThreadsService } from '../../services/threads.service';
import { Observable } from 'rxjs';
import { Thread } from '../../models';

@Component({
    selector: 'single-thread',
    inputs: ['thread'],
    template: `<div>
        <div class="media conversation">
            <div class="pull-left">
                <img class="media-object avatar" src="{{thread.avatarSrc}}">
            </div>
            <div class="media-body">
                <h5 class="media-heading contact-name">
                    {{thread.name}}
                    <span *ngIf="selected">&bull;</span>
                </h5>
                <small class="message-preview">
                    {{thread.lastMessage.text}}
                </small>
            </div>
            <a (click)="clicked($event)" class="div-link">Select</a>
        </div>
    </div>`
})
export class SingleThread implements OnInit {
    thread: Thread;
    selected: boolean = false;

    constructor(
        public threadsService: ThreadsService
    ) {}

    onNgInit(): void {
        this.threadsService.currentThread.subscribe(
            (currentThread: Thread) => {
                this.selected = currentThread && this.thread && (currentThread.id === this.thread.id);
            }
        );
    }

    clicked(event: any): void {
        this.threadsService.setCurrentThread(this.thread);
        event.preventDefault();
    }
}
