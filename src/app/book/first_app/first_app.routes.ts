import { RouterConfig } from '@angular/router';
import { FirstApp }     from './first_app.component';
import { HelloWorld}    from './hello_world';
import { SimpleReddit } from './simple_reddit';

export const FirstAppRoutes: RouterConfig = [
    {
        path: 'book/first_app',
        component: FirstApp,
        children: [
            { path: 'hello_world',      component: HelloWorld },
            { path: 'simple_reddit',    component: SimpleReddit }
        ]
    }
];
