import { RouterConfig } from '@angular/router';
import { Ngrx } from './ngrx.component';
import { Chat } from './chat';
import { Rxjs } from './rxjs';
import { Party } from './party';
import { Basic } from './basic/basic.component';


export const NgrxRoutes: RouterConfig = [
    {
        path: 'book/ngrx',
        component: Ngrx,
        children: [
            { path: 'chat',      component: Chat },
            { path: 'rxjs',      component: Rxjs },
            { path: 'party',     component: Party },
            { path: 'basic',     component: Basic }
        ]
    }
];
