import { Component } from '@angular/core';
import { Book } from '../book.component';

@Component({
    selector: 'one',
    directives: [Book],
    template: `<div>
        <div class="card-container">
            <md-card x-large class="sample-content"><h1>one</h1></md-card>
        </div>
    </div>`
})
export class One {}