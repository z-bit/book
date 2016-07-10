# nested routing
[back](../README.md)

/src/main.browser.ts 

    import { bootstrap } from '@angular/platform-browser-dynamic';
    import { PLATFORM_PROVIDERS } from './platform/browser';
    import { ENV_PROVIDERS, decorateComponentRef } from './platform/environment';
    import { App, APP_PROVIDERS } from './app';   
    
    export function main(initialHmrState?: any): Promise<any> {
      return bootstrap(App, [
        ...PLATFORM_PROVIDERS,      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        ...ENV_PROVIDERS,
        ...APP_PROVIDERS,
      ])
      .then(decorateComponentRef)
      .catch(err => console.error(err));
    }
[back](../README.md)   

/src/platform/browser.ts

    export * from './browser-directives';
    export * from './browser-pipes';
    export * from './browser-providers';

    import { DIRECTIVES } from './browser-directives';
    import { PIPES } from './browser-pipes';
    import { PROVIDERS } from './browser-providers';    

    export const PLATFORM_PROVIDERS = [
      ...PROVIDERS,                 //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      ...DIRECTIVES,
      ...PIPES
    ];
[back](../README.md)

/src/platform/browser-providers.ts

    import { provideRouter } from '@angular/router';
    import { disableDeprecatedForms, provideForms } from '@angular/forms';

    // TODO(gdi2290): replace with @angular2-material/all
    import { MATERIAL_PROVIDERS } from './browser/angular2-material2';
    
    import { provideWebpack } from '@angularclass/webpack-toolkit';
    import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';
        
    import { routes, asyncRoutes, prefetchRouteCallbacks } from '../app/app.routes';    //<<<<<<<<<<<<
    
    export const APPLICATION_PROVIDERS = [
      disableDeprecatedForms(),
      provideForms(),
    
      provideRouter(routes),        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      provideWebpack(asyncRoutes),
      providePrefetchIdleCallbacks(prefetchRouteCallbacks),
    
      ...HTTP_PROVIDERS,
      ...MATERIAL_PROVIDERS,
    
      { provide: LocationStrategy, useClass: HashLocationStrategy }
    ];
    
    export const PROVIDERS = [      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      ...APPLICATION_PROVIDERS
    ];
[back](../README.md)
    
/src/app/app.routes.ts

    import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
    import { RouterConfig } from '@angular/router';
    import { Home } from './home';
    import { Book } from './book';
    import { NoContent } from './no-content';
    import { BookRoutes } from './book/book.routes';
    
    export const routes: RouterConfig = [
        ...BookRoutes,              //<<<<<<<<<<<<<<<<<<<< child routes first !! <<<<<<<<<<<<<<<<<<<<<
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
[back](../README.md)    

/src/app/book/book.routes.ts

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

[back](../README.md)
