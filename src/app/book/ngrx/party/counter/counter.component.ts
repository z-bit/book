import { Component, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Store} from '@ngrx/store';
import {INCREMENT, DECREMENT, RESET} from 'app/stores/reducers/counterReducer';
interface State {
    counter: number
}
interface Todo {
    id: number,
    todo?: string,
    completed?: boolean
}
interface Action {
    type: string,
    payload: Todo
}

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
    //Reducers
    sum(total, value) {
        return total + value;
    }
    tick(total, action) {
        switch (action) {
            case 'INC': return total + 1;
            case 'DEC': return total - 1;
            default: return total;
        }
    }
    todoReducer(allTodos:Todo[], action:Action) {
        switch (action.type) {
            case 'ADD_TODO':
                return allTodos.concat([action.payload]);
            case 'DEL_TODO':
                return allTodos.filter( todo =>
                    todo.id !== action.payload.id
                );
            case 'COMPLETE_TODO':
                return allTodos.map( todo => {
                    return  todo.id === action.payload.id
                        ? Object.assign({}, todo, {completed: true})
                        : todo
                    ;
                });
            default:
                return allTodos;
        }
    }


    constructor(
        private store: Store<State>
    ){
        this.counter$ = store.select('counter');

        // simple reduce
        console.log('sum', [1, 2, 3].reduce(this.sum, 0));                  // 6
        //                                            ^ initial value

        console.log('tick', ['INC', 'INC', 'DEC'].reduce(this.tick, 0));    // 1
        let allTodos = [
            {id: 1, todo:'learn', completed: false} ,
            {id: 2, todo:'sleep', completed: false}
        ];
        let action1 = {type: 'ADD_TODO', payload: {id: 3, todo:'eat', completed: false}};
        let action2 = {type: 'DEL_TODO', payload: {id: 1}};
        let action3 = {type: 'COMPLETE_TODO', payload: {id: 2}};
        let actionFake = {type: 'NOT_EXIST', payload:'booh'};
        let t1 = this.todoReducer(allTodos, action1);
        let t2 = this.todoReducer(t1, action2);
        let t3 = this.todoReducer(t2, action3);
        console.log('t0 allTodos', allTodos);
        console.log('t1 id=3 added: ', t1);
        console.log('t2 id=0 removed: ', t2);
        console.log('t3 id=2 completed: ', t3);

    }

    inc(){
        this.store.dispatch({type: INCREMENT});

        console.log('counter$', this.counter$);                             // object
        console.log('counter', this.counter$.destination._value.counter);   // value
        console.log('store: ', this.store._value.counter);                  // same value
        this.counter$.subscribe(state => console.log('subscribe: ', state));// proper way
    }

    dec(){
        this.store.dispatch({type: DECREMENT});
    }

    reset(){
        this.store.dispatch({type: RESET});
    }
}

