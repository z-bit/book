import { Component } from '@angular/core';
import { ArticleComponent } from './article.component';
import { Article } from './article.component';


@Component({
    selector: 'simple-reddit',
    directives: [ArticleComponent],

    styleUrls: ['simple_reddit.css'],
    template: `<div>
        <div class="card-container">
            <md-card x-large class="sample-content">
                <h1>Simple Reddit</h1>
                <form class="ui large form segment">
                    <h3 class="ui header">Add a link</h3>
                    <md-input #newtitle placeholder="Tiltle"></md-input>
                    <br>
                    <md-input #newlink placeholder="Link"></md-input>
                    <br>
                    <button md-raised-button class="submit" color="primary" (click)="addArticle(newtitle, newlink)">
                        Submit link
                    </button>
                </form>
            </md-card>

            <md-card>
                <reddit-article
                    *ngFor="let article of sortedArticles()"
                    [article]="article"
                ></reddit-article>
            </md-card>
        </div>
    </div>`
})
export class SimpleReddit {
    articles: Article[];

    constructor() {
        this.articles = [
            new Article('Angular 2', 'http://angular.io', 10),
            new Article('Fullstack', 'http://fullstack.io', 2),
            new Article('Angular Homepage', 'http://angular.io', 1)
        ];
    }

    addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
        console.log(`Adding article title: ${title.value} and link: ${link.value}`);
        this.articles.push(new Article(title.value, link.value, 0));
        title.value = '';
        link.value = '';
    }

    sortedArticles(): Article[] {
        return this.articles.sort((a: Article, b:Article) => b.votes - a.votes);
    }
}