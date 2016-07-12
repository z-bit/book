import { Component } from '@angular/core';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';

@Component({
    selector: 'reddit-article',
    inputs: ['article'],
    styleUrls: ['simple_reddit.css'],
    directives: [MD_GRID_LIST_DIRECTIVES],
    host: {
        class: 'row'
    },
    template: `<div>
        <md-grid-list cols="8" rowHeight="70px">

            <md-grid-tile colspan="6" [style.background]="'lightblue'">
                <span class="left">
                    <a href="{{ article.link }}">{{ article.title }} </a>
                    &nbsp;
                    <span class="meta">{{ article.domain() }}</span>
                    &nbsp;
                    ({{  article.link }})
                </span>
            </md-grid-tile>

            <md-grid-tile [style.background]="'lightgrey'">
                <span class="large_font">{{article.votes}}&nbsp;</span>
                Points

            </md-grid-tile>

            <md-grid-tile [style.background]="'lightgrey'">
                 <button md-mini-fab (click)="voteUp()" color="primary">
                    <md-icon class="md-24">add</md-icon>
                </button>
                &nbsp;
                <button md-mini-fab (click)="voteDown()" color="primary">
                        <md-icon class="md-24">remove</md-icon>
                </button>
            </md-grid-tile>
            <hr>
        </md-grid-list>

    </div>`
})
export class ArticleComponent {
    article: Article;

    voteUp() {
        this.article.voteUp();
        return false;
    }

    voteDown() {
        this.article.voteDown();
        return false;
    }
}

export class Article {
    title: string;
    link: string;
    votes: number;

    constructor(title: string, link:string, votes?: number) {
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }

    voteUp() {
        this.votes += 1;
    }

    voteDown() {
        this.votes -= 1;
    }

    domain(): string {
        try {
            const link: string = this.link.split('//')[1];
            return link.split('/')[0];
        } catch(err) {
            return null;
        }
    }
}