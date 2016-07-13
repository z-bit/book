import { Component } from '@angular/core';

@Component({
    selector: 'demo-form-sku',
    template:`<div>
        <md-card>
            <md-card-header>
                <md-card-title>Demo Form: Sku</md-card-title>
            </md-card-header>
            <md-card-content>
                <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
                    <md-input placeholder="SKU" id="skuInput" name="sku" ngModel></md-input>
                    <br>
                    <button md-raised-button type="submit" color="primary">Submit</button>
                </form>
            </md-card-content>
        </md-card>
    </div>`
})
export class DemoFormSku {
    onSubmit(form: any) {
        console.log('submitted value: ', form);
    }
}