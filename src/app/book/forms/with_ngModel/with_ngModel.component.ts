import { Component } from '@angular/core';
import { FORM_DIRECTIVES,
         REACTIVE_FORM_DIRECTIVES,
         FormBuilder,
         FormGroup,
         Validators,
         AbstractControl,
         FormControl
} from '@angular/forms';

@Component({
    selector: 'with-ngmodel',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    template: `<div>
        <style>
            .error {
                color: red;
            }
        </style>
         <md-card>
            <md-card-header>
                <md-card-title>Demo Form: with ngModel</md-card-title>
            </md-card-header>
            <md-card-content>
                <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)">
                    <md-input
                        placeholder="Product Name"
                        [formControl]="myForm.find('productName')"

                        [(ngModel)]="productName"
                    ></md-input>
                    <br>
                    <button md-raised-button type="submit" color="primary">Submit</button>
                </form>
            </md-card-content>
            <br>
            <md-card-footer>
                Product name at the time being: {{ productName }}
                <br>&nbsp;
            </md-card-footer>
        </md-card>
    </div>`
})
export class WithNgModel {
    myForm: FormGroup;
    productName: string;

    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            'productName': ['', Validators.required]
        });
    }

    onSubmit(value: string): void {
        console.log('submitted value: ', value);
    }


}