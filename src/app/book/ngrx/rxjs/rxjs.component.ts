import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'rxjs',
    styleUrls: ['./rxjs.css'],
    template: `<div>
        <div class="card-container">
            <md-card>
                <md-card-title class="header">
                    <span class="h2">Who to follow?</span>
                    <button md-button (click)="refresh()">Refresh</button>
                </md-card-title>
                <md-card-content>
                    <ul>
                        <li *ngFor="let git of gits; let i = index;">
                            <md-card>
                                <button md-mini-fab (click)="refresh(i)">
                                     <md-icon class="md-24">refresh</md-icon>
                                </button>
                                <img src="{{ git.avatar_url }}" >
                                <a href="{{ git.html_url }}" class="large">{{ git.login }}</a>

                            </md-card>
                            <br>
                        </li>
                    </ul>
                </md-card-content>
            </md-card>
        </div>
    </div>`
})
export class Rxjs {
    public gits;
    public arr;

    constructor(private http:Http) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh(index = '') {
        var randomOffset = Math.floor(Math.random() * 500);
        var url = 'https:/api.github.com/users?since=' + randomOffset + '&per_page=3';
        this.http
            .get(url)
            .map(
                (res:Response) => res.json()
            )
            .subscribe(
                data => {
                    var x;
                    switch (index) {
                        case 0:
                            this.arr = data;
                            this.gits[0] = this.arr[0];
                            break;
                        case 1:
                            this.arr = data;
                            this.gits[1] = this.arr[1];
                            break;
                        case 2:
                            this.arr = data;
                            this.gits[2] = this.arr[2];
                            break;
                        default:
                            this.gits = data;
                    }

                },
                err => console.error(err)
            )
        ;
    }
}