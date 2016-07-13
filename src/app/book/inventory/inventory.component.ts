import { Component } from '@angular/core';
import { Book } from '../book.component';
import { ProductList } from './productList';

@Component({
    selector: 'inventory',
    directives: [Book, ProductList],
    styles: ['styles.css'],
    template: `<div>
        <div class="card-container inventory">
        <h1>Inventory</h1>
        <product-list
            [productList]="products"
            (onProductSelected)="selectedProduct($event)"
        ></product-list>

        </div>
    </div>`
})
export class Inventory {
    products: Product[];

    constructor() {
        this.products = [
            new Product(
                'MYSHOES', 'Black Running Shoes',
                'app/book/inventory/resources/images/products/black-shoes.jpg',
                ['Men', 'Shoes', 'Running Shoes'],
                109.99),
            new Product(
                'NEATOJACKET', 'Blue Jacket',
                'app/book/inventory/resources/images/products/blue-jacket.jpg',
                ['Women', 'Apparel', 'Jackets & Vests'],
                238.99),
            new Product(
                'NICEHAT', 'A Nice Black Hat',
                'app/book/inventory/resources/images/products/black-hat.jpg',
                ['Men', 'Accessories', 'Hats'],
                29.99)
        ];

    }

    selectedProduct(product: Product) {
        console.log('Product clicked: ', product.name);
    }
}

export class Product {
    constructor(
        public sku: string,
        public name: string,
        public imageUrl: string,
        public department: string[],
        public price: number
    ) {}
}