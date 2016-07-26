import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'basic',
    template: `<div>
        <h1> basic (rxjs) </h1>
        <h2> Gits </h2>
        <ul>
            <li *ngFor="let git of gits">{{ git.login }}</li>
        </ul>
    </div>`
})
export class Basic {
    public gits;

    constructor(
        private http: Http
    ) {}

    ngOnInit() {
        this.getGits();
    }

    getGits() {

        this.http
            .get('https://api.github.com/users?since=2&per_page=5')
            .map(
                (res: Response) => res.json()
            )
            .subscribe(
                data => this.gits = data,
                err => console.error(err),
                () => console.log('done')
            )
        ;
    }
}









