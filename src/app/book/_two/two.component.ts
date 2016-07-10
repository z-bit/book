import { Component } from '@angular/core';
import { Book } from '../book.component';
@Component({
    selector: 'two',
    directives: [Book],
    template: `<div>
        <div class="card-container">
            <md-card x-large class="sample-content"><h1>two</h1></md-card>
        </div>
    </div>`
})
export class Two {}