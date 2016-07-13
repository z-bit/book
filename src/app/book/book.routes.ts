import { RouterConfig } from '@angular/router';
import { Book } from './book.component';
import { FirstApp } from './first_app';
import { Inventory } from './inventory';
import { Forms } from './forms';
import { Ngrx } from './ngrx';

import {FirstAppRoutes } from './first_app/first_app.routes';
import {FormRoutes} from "./forms/forms.routes";
import {NgrxRoutes} from './ngrx/ngrx.routes';


export const BookRoutes: RouterConfig = [
    ...FirstAppRoutes,
    ...FormRoutes,
    ...NgrxRoutes,
    {
        path: 'book',
        component: Book,
        children: [
            { path: 'first_app', component: FirstApp },
            { path: 'inventory', component: Inventory },
            { path: 'forms', component: Forms },
            { path: 'ngrx', component: Ngrx}
        ]
    }
];
