import { Component } from '@angular/core';
import { AppState } from '../../app.service';

import {
    ActivatedRoute,
    ROUTER_DIRECTIVES,
    Router,
    RouterConfig
} from '@angular/router';


@Component({
    selector: 'forms',
    directives: [ROUTER_DIRECTIVES],
    template: `<div>
          <md-toolbar color="warn">
              <span>B O O K    FORMS</span>
              <span class="fill"></span>
              <a md-button router-active [routerLink]=" ['./demo_form_sku'] "
                title="Simplest form possible">
                SKU
              </a>
              <a md-button router-active [routerLink]=" ['./sku_with_builder'] "
                title="Form with FormBuilder">
                FormBuilder
              </a>
              <a md-button router-active [routerLink]=" ['./validations_explicit'] "
                title="Validators - explicit declaration of controls">
                V (explicit)
              </a>
              <a md-button router-active [routerLink]=" ['./validations_shorthand'] "
                title="Validators - using .controls in template">
                V (shorthand)
              </a>
              <a md-button router-active [routerLink]=" ['./custom_validations'] " width="50px"
                title="Form with custom validation">
                Custom-Validators
              </a>
              <a md-button router-active [routerLink]=" ['./with_events'] "
                title="Form with events">
                with events
              </a>
              <a md-button router-active [routerLink]=" ['./with_ngModel'] "
                title="Form with ngModel">
                with ngModel
              </a>
              <a md-button router-active [routerLink]=" ['/book'] "
                title="Back to Book">
                BACK
              </a>
          </md-toolbar>

          <router-outlet></router-outlet>

    <\div>`
})
export class Forms {
    constructor(private _router: Router){}
}