import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { RouterConfig } from '@angular/router';
import { Home } from './home';
import { Book } from './book';
import { NoContent } from './no-content';
import { BookRoutes } from './book/book.routes';
import { FirstAppRoutes } from './book/first_app/first_app.routes';

export const routes: RouterConfig = [

    ...BookRoutes,
    { path: '',      component: Home },
    { path: 'home',  component: Home },
    { path: 'book',  component: Book },

    // make sure you match the component type string to the require in asyncRoutes
    { path: 'about', component: 'About' },
    // async components with children routes must use WebpackAsyncRoute
    { path: 'detail', component: 'Detail', canActivate: [ WebpackAsyncRoute ] },
    { path: '**',    component: NoContent }
];

export const asyncRoutes: AsyncRoutes = {
  // we have to use the alternative syntax for es6-promise-loader to grab the routes
  'About': require('es6-promise-loader!./about'),
  'Detail': require('es6-promise-loader!./+detail'),
};

export const prefetchRouteCallbacks: Array<IdleCallbacks> = [
  asyncRoutes['About'],
  asyncRoutes['Detail'],
];

