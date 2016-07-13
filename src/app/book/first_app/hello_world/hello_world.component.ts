import { Component } from '@angular/core';

@Component({
    selector: 'hello-world',
    template: `<div>
        <div class="card-container">
            <md-card x-large class="sample-content">
                <h1>Hello World!</h1>
                <ul>
                    <li *ngFor="let name of names">Hello {{ name }}!</li>
                </ul>
            </md-card>
        </div>
    </div>`
})
export class HelloWorld {
    names: string[];

    constructor() {
        this.names = ['Ari', 'Carlos', 'Felipe', 'Nate'];
    }
}