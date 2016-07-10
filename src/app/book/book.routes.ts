import { RouterConfig } from '@angular/router';
import { Book } from './book.component';
import { One } from './_one';
import { Two } from './_two';
import { Three } from './_three';

export const BookRoutes: RouterConfig = [
    {
        path: 'book',
        component: Book,
        children: [
            { path: '_one', component: One },
            { path: '_two', component: Two },
            { path: '_three', component: Three }
        ]
    }
];
