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
    selector: 'validations-explicit',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    template: `<div>
        <style>
            .error {
                color: red;
            }
        </style>
         <md-card>
            <md-card-header>
                <md-card-title>Demo Form: with Validations (explicit)</md-card-title>
            </md-card-header>
            <md-card-content>
                <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)">
                    <md-input
                        placeholder="SKU"
                        [formControl]="myForm.controls['sku']"
                        [class.error]="!sku.valid && sku.touched"
                    ></md-input>
                    <div class="error" *ngIf="!sku.valid">SKU is invalid</div>
                    <div class="error" *ngIf="sku.hasError('required')">SKU is required</div>
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
export class ValidationsExplicit {
    myForm: FormGroup;
    sku: AbstractControl;

    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            'sku': ['', Validators.required]
        });

        this.sku = this.myForm.controls['sku'];
    }

    onSubmit(value: string): void {
        console.log('submitted value: ', value);
    }
}