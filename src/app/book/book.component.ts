import { Component } from '@angular/core';
import { AppState } from '../app.service';

import {
    ActivatedRoute,
    ROUTER_DIRECTIVES,
    Router,
    RouterConfig
} from '@angular/router';


@Component({
    selector: 'book',
    directives: [ROUTER_DIRECTIVES],
    template: `<div>
          <md-toolbar color="accent">
              <span>B O O K</span>
              <span class="fill"></span>
              <a md-button router-active [routerLink]=" ['./first_app'] ">
                First_App
              </a>
              <a md-button router-active [routerLink]=" ['./_two'] ">
                Two
              </a>
              <a md-button router-active [routerLink]=" ['./_three'] ">
                Three
              </a>
              <a md-button router-active [routerLink]=" ['/'] ">
                BACK
              </a>
          </md-toolbar>

          <router-outlet></router-outlet>

    <\div>`
})
export class Book {
    constructor(private _router: Router){}
}