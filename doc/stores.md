# Apply @ngrx/store to angular2-webpack-starter
[back](../README.md)

/src/app/book/party/counter
    
    import { Component, ChangeDetectionStrategy } from '@angular/core';
    import {Observable} from 'rxjs/Rx';
    import {Store} from '@ngrx/store';
    import {INCREMENT, DECREMENT, RESET} from 'app/stores/reducers/counterReducer';
    
    @Component({
        selector: 'counter',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `<div>
            <h3>Counter</h3>
            <button (click)="dec()">-</button>
            <b>&nbsp;{{counter$ | async}}&nbsp;</b>
            <button (click)="inc()">+</button>
            &nbsp;&nbsp;&nbsp;
            <button (click)="reset()">0</button>
        </div>`
    })
    export class Counter {
        counter$: Observable<number>;
    
        constructor(
            private store: Store<any>
        ){
            this.counter$ = store.select('counter');
        }
    
        inc(){
            this.store.dispatch({type: INCREMENT});
    
            console.log('counter$', this.counter$);                                 // object
            console.log('counter', this.counter$.destination._value.counter);       // value
            console.log('store: ', this.store._value.counter);                      // same value
            this.counter$.subscribe(state => console.log('subscribe: ', state));    // proper way
        }
    
        dec(){
            this.store.dispatch({type: DECREMENT});
        }
    
        reset(){
            this.store.dispatch({type: RESET});
        }
    }
    
[back](../README.md)

/src/app/stores/reducers/counterReducer.ts

    import { ActionReducer, Action } from '@ngrx/store';
    export const INCREMENT = 'INCREMENT';
    export const DECREMENT = 'DECREMENT';
    export const RESET = 'RESET';
    
    export const counterReducer: ActionReducer<number> = (state: number = 0, action: Action) => {
        switch (action.type) {
            case INCREMENT:
                return state + 1;
    
            case DECREMENT:
                return state - 1;
    
            case RESET:
                return 0;
    
            default:
                return state;
        }
    }

[back](../README.md)

/src/app/stores/stores.ts

    import { counterReducer } from './reducers/counterReducer';
    import { filter } from './reducers/filter';
    import { people } from './reducers/people';
    
    export const stores = {
        counter: counterReducer,
        filter,
        people
    };
    
[back](../README.md)

/src/platform/browser-providers.ts

    import { provideStore } from '@ngrx/store';         //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    import { stores } from '../app/stores/stores';      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    
    export const APPLICATION_PROVIDERS = [
      // new Angular 2 forms
      disableDeprecatedForms(),
      provideForms(),
      provideStore(stores),                             //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      provideRouter(routes),
      provideWebpack(asyncRoutes),
      providePrefetchIdleCallbacks(prefetchRouteCallbacks),
    
      ...HTTP_PROVIDERS,
      ...MATERIAL_PROVIDERS,
    
      { provide: LocationStrategy, useClass: HashLocationStrategy }
    ];    

[back](../README.md)

/src/app/main.browser.ts

    export function main(initialHmrState?: any): Promise<any> {
    
      return bootstrap(App, [
        // To add more vendor providers please look in the platform/ folder
        ...PLATFORM_PROVIDERS,
        ...ENV_PROVIDERS,
        ...APP_PROVIDERS,
      ])
      .then(decorateComponentRef)
      .catch(err => console.error(err));
    
    }

[back](../README.md)


