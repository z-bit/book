import { Component, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Store} from '@ngrx/store';
import {INCREMENT, DECREMENT, RESET} from 'app/stores/reducers/counterReducer';

@Component({
    selector: 'counter2',
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
export class Counter2 {
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

