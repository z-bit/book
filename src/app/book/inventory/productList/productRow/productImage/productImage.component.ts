import { Component } from '@angular/core';

/**
 * @ProductImage: component to show a single Product's image
 */
@Component({
    selector: 'product-image',
    host: {'class': 'ui small image'},
    inputs: ['product']
    template: `<div>
        <style>
            .product-image {
                float: left;
                width: 50px;
                height: 50px;
                padding-right: 20px;
            }
        </style>
        <img class="product-image" [src]="product.imageUrl">
    </div>`
})
export class ProductImage {

}