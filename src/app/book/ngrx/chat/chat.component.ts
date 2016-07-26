import { Component } from '@angular/core';

import { Navbar } from './navbar/navbar.component';
import { Threads } from './threads/threads.component';
import { Window } from './window/window.component';

import { messagesServiceInjectables, MessagesService } from './services/messages.service';
import { threadsServiceInjectables, ThreadsService } from './services/threads.service';
import { userServiceInjectables, UserService } from './services/user.service';

import { utilInjectables } from './utils';

import { ChatExampleData } from './ChatExampleData';

@Component({
    selector: 'chat',
    directives: [Navbar, Threads, Window],
    providers: [MessagesService, ThreadsService, UserService],
    template: `<div>
        <div class="card-container">
            <md-card>
                <md-card-title>Chat</md-card-title>
                <md-card-content>
                    <md-card>
                        <navbar></navbar>
                    </md-card>
                    <br>
                    <md-card>
                        <threads></threads>
                    </md-card>
                    <br>
                    <md-card>
                        <window></window>
                    </md-card>
                </md-card-content>
            </md-card>
        </div>
    </div>`
})
export class Chat {
    constructor(
        public messagesService: MessagesService,
        public threadsService: ThreadsService,
        public userService: UserService
    ) {
        ChatExampleData.init(messagesService, threadsService, userService);
    }
}