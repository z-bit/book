import { Component } from '@angular/core';
import { FORM_DIRECTIVES,
         REACTIVE_FORM_DIRECTIVES,
         FormBuilder,
         FormGroup,
         //new:
         Validators,
         AbstractControl
} from '@angular/forms';

@Component({
    selector: 'validations-shorthand',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    template: `<div>
        <style>
            .error {
                color: red;
            }
        </style>
         <md-card>
            <md-card-header>
                <md-card-title>Demo Form: with Validations (shorthand)</md-card-title>
            </md-card-header>
            <md-card-content>
                <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)">
                    <md-input
                        placeholder="SKU"
                        [formControl]="myForm.controls['sku']"
                        [class.error]="!myForm.controls['sku'].valid && myForm.controls['sku'].touched"
                    ></md-input>
                    <div class="error" *ngIf="!myForm.controls['sku'].valid">SKU is invalid</div>
                    <div class="error" *ngIf="myForm.controls['sku'].hasError('required')">SKU is required</div>
                    <div class="error" *ngIf="!myForm.valid">Form is invalid</div>
                    <br>
                    <div class="error" *ngIf="myForm.valid">
                        <button md-raised-button type="submit" color="primary">Submit</button>
                    </div>

                </form>
            </md-card-content>
        </md-card>
    </div>`
})
export class ValidationsShorthand {
    myForm: FormGroup;

    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            'sku': ['', Validators.required]
        });
    }

    onSubmit(value: string): void {
        console.log('submitted value: ', value);
    }
}