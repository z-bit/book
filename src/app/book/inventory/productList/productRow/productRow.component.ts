import { Component } from '@angular/core';
import { Product} from '../../inventory.component';
import { ProductImage } from './productImage';
import { ProductDepartment } from './productDepartment';
import { ProductPrice } from './productPrice';

/**
 * @ProductRow: component for the view of a single product
 */
@Component({
    selector: 'product-row',
    inputs: ['product', 'selected'],
    styles: ['../styles.css'],
    host: {'class': 'item'},    // this component gets the css-class 'item'
    directives: [ProductImage, ProductDepartment, ProductPrice],
    template: `<div>
        <style>
            .meta {
                color: #9A9A9A;
                font-size: small;
            }
            .header {
                font-size: large;
                font-weight: bold;
            }
            .selected {
                background-color: lightgreen;
            }
        </style>
            <md-card class="{{selected ? 'selected': ''}}">
<!--        <md-card [ng-class]="{selected: selected}">             this does not work !!!           -->
            <product-image [product]="product"></product-image>
            <div class="content">
                <div class="header">{{ product.name }}</div>
                <div class="meta">
                    <div class="product-sku">SKU #{{ product.sku }}</div>
                </div>
                <div class="description">
                    <product-department [product]="product"></product-department>
                </div>
            </div>
            <product-price [price]="product.price"></product-price>
        </md-card>
        <br>
    </div>`
})
export class ProductRow {
    product: Product;
    selected: boolean;
}