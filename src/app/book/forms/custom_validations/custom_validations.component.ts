import { Component } from '@angular/core';
import { FORM_DIRECTIVES,
         REACTIVE_FORM_DIRECTIVES,
         FormBuilder,
         FormGroup,
         Validators,
         AbstractControl,
         //new:
         FormControl
} from '@angular/forms';

function skuValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/^123/)) {
        return {invalidSku: true};
    }
}

@Component({
    selector: 'custom-validations',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    template: `<div>
        <style>
            .error {
                color: red;
            }
        </style>
         <md-card>
            <md-card-header>
                <md-card-title>Demo Form: with Custom-Validations</md-card-title>
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
                    <div class="error" *ngIf="myForm.controls['sku'].hasError('invalidSku')">
                        SKU must begin with <tt>123</tt>
                    </div>
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
export class CustomValidations {
    myForm: FormGroup;

    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            'sku': ['', Validators.compose([Validators.required, skuValidator])]
        });
    }

    onSubmit(value: string): void {
        console.log('submitted value: ', value);
    }


}