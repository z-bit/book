import { Component, EventEmitter } from '@angular/core';
import { ProductRow } from './productRow';
import { Product} from '../inventory.component';

@Component({
    selector: 'product-list',
    directives: [ProductRow],
    inputs: ['productList'],
    outputs: ['onProductSelected'],
    template: `<div>
        <style>
            .selected{
                border: 5px solid red;
            }
        </style>
        <product-row
            *ngFor="let myProduct of productList"
            [product]="myProduct"
            (click)="clicked(myProduct)"
            [selected]="isSelected(myProduct)"
        ></product-row>
    </div>`
})
export class ProductList {
    /**
     * @input productList - the Product[] passed to the component
     */
    productList: Product[];

    /**
     * @output onProductSelected -  outputs the current Product
     *                              whenever a new Product is selected
     */
    onProductSelected: EventEmitter<Product>;

    /**
     * @property currentProduct -   local state containing the
     *                              currently selected 'Product'
     */
    currentProduct: Product;

    constructor() {
        this.onProductSelected = new EventEmitter();
    }

    clicked(product: Product): void {
        this.currentProduct = product;
        this.onProductSelected.emit(product);
    }

    isSelected(product: Product) {
        if(!product || !this.currentProduct) return false;
        return product.sku === this.currentProduct.sku;
    }
}