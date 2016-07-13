import { Component } from '@angular/core';
import { FORM_DIRECTIVES,
         REACTIVE_FORM_DIRECTIVES,
         FormBuilder,
         FormGroup } from '@angular/forms';

@Component({
    selector: 'sku-with-builder',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    template: `<div>
         <md-card>
            <md-card-header>
                <md-card-title>Demo Form: Sku with FormBuilder</md-card-title>
            </md-card-header>
            <md-card-content>
                <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)">
                    <md-input placeholder="SKU" [formControl]="myForm.controls['sku']"></md-input>
                    <br>
                    <button md-raised-button type="submit" color="primary">Submit</button>
                </form>
            </md-card-content>
        </md-card>
    </div>`
})
export class SkuWithBuilder {
    myForm: FormGroup;

    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            'sku': ['ABC123']
        });
    }

    onSubmit(value: string): void {
        console.log('submitted value: ', value);
    }
}