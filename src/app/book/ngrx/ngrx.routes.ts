import { RouterConfig } from '@angular/router';
import { Ngrx } from './ngrx.component';
import { Chat } from './chat';
import { Party } from './party';

export const NgrxRoutes: RouterConfig = [
    {
        path: 'book/ngrx',
        component: Ngrx,
        children: [
            { path: 'chat',      component: Chat },
            { path: 'party',     component: Party }
        ]
    }
];
