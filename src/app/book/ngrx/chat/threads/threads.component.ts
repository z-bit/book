import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ThreadsService } from '../services/threads.service';
import { Thread } from '../models';
import { SingleThread } from './singleThread/singleThread.component';

@Component({
    selector: 'threads',
    directives: [SingleThread],
    changeDetection: ChangeDetectionStrategy.onPush,
    template: `<div>
        <!-- conversations -->
        <div class="row">
            <div class="conversation-wrap">
                <single-thread
                    *ngFor="let thread of threads | async"
                    [thread]="thread"
                >
                </single-thread>
            </div>
        </div>
    </div>`
})
export class Threads  implements OnInit {
    threads: Observable<any>;

    constructor(
        public threadsService: ThreadsService
    ) {
        this.threads = this.threadsService.orderedThreads;
    }


}
