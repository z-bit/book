import { Component } from '@angular/core';

@Component({
    selector: 'product-price',
    inputs: ['price'],
    template: `<div>
        <style>
            .price {
                float: right;
            }
        </style>
        <div class="price">
            £{{ price }}
        </div>
    </div>`
})
export class ProductPrice {
    price: number;
}