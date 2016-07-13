import { Component } from '@angular/core';
import { AppState } from '../../app.service';

import {
    ActivatedRoute,
    ROUTER_DIRECTIVES,
    Router,
    RouterConfig
} from '@angular/router';


@Component({
    selector: 'ngrx',
    directives: [ROUTER_DIRECTIVES],
    template: `<div>
          <md-toolbar color="warn">
              <span>B O O K  -  ngrx</span>
              <span class="fill"></span>
              <a md-button router-active [routerLink]=" ['./party'] ">
                party
              </a>
              <a md-button router-active [routerLink]=" ['./chat'] ">
                chat
              </a>
              <a md-button router-active [routerLink]=" ['/book'] ">
                BACK
              </a>
          </md-toolbar>

          <router-outlet></router-outlet>

    <\div>`
})
export class Ngrx {
    constructor(private _router: Router){}
}