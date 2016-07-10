import { Component } from '@angular/core';
import { AppState } from '../../app.service';

import {
    ActivatedRoute,
    ROUTER_DIRECTIVES,
    Router,
    RouterConfig
} from '@angular/router';


@Component({
    selector: 'first-app',
    directives: [ROUTER_DIRECTIVES],
    template: `<div>
          <md-toolbar color="warn">
              <span>B O O K  -  FIRST_APP</span>
              <span class="fill"></span>
              <a md-button router-active [routerLink]=" ['./hello_world'] ">
                hello_world
              </a>
              <a md-button router-active [routerLink]=" ['./simple_reddit'] ">
                simple_reddit
              </a>
              <a md-button router-active [routerLink]=" ['/book'] ">
                BACK
              </a>
          </md-toolbar>

          <router-outlet></router-outlet>

    <\div>`
})
export class FirstApp {
    constructor(private _router: Router){}
}