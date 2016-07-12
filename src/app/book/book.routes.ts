import { RouterConfig } from '@angular/router';
import { Book } from './book.component';
import { FirstApp } from './first_app';
import { Inventory } from './inventory';
import { Three } from './_three';

import {FirstAppRoutes } from './first_app/first_app.routes';

export const BookRoutes: RouterConfig = [
    ...FirstAppRoutes,
    {
        path: 'book',
        component: Book,
        children: [
            { path: 'first_app', component: FirstApp },
            { path: 'inventory', component: Inventory },
            { path: '_three', component: Three }
        ]
    }
];
