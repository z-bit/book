import { Component } from '@angular/core';

import { Observable } from 'rxjs/Rx'
import { Store } from '@ngrx/store';
import { people } from 'app/stores/reducers/people';
import { filter } from 'app/stores/reducers/filter'

import { PersonList } from './person_list';
import { PersonInput } from './person_input';
import { FilterSelect } from './filter_select';
import { Counter2 } from './counter2';

interface People {
    id: number,
    name: string,
    guests: number,
    attending: boolean
}

@Component({
    selector: 'party',
    directives: [Counter2, FilterSelect, PersonInput, PersonList],
    template: `<div>
        <div class="card-container">
            <md-card>
                <md-card-title>Party Planner</md-card-title>
                <md-card-content>
                    <counter2></counter2>
                    <br>
                    <filter-select
                        (updateFilter)="updateFilter($event)"
                    >
                    </filter-select>

                    <person-input
                        (addPerson)="addPerson($event)"
                    >
                    </person-input>

                    <person-list
                        [people]="people | async"
                        (addGuest)="addGuest($event)"
                        (removeGuest)="removeGuest($event)"
                        (removePerson)="removePerson($event)"
                        (toggleAttending)="toggleAttending($event)"
                    >

                    </person-list>

                </md-card-content>
            </md-card>
        </div>
    </div>`
})
export class Party {
    public people;
    private: id = 0;

    constructor (
        private _store: Store<any>
    ) {
        this.people = Observable.combineLatest(
            _store.select('counter2'),
            _store.select('people'),
            _store.select('filter'),
            (people: People[], filter) => {
//                return people.filter(filter);
            }
        );
    }

    addPerson(name) {
        this._store.dispatch({
            type: "ADD_PERSON",
            payload: {
                id: ++this.id,
                name,
                guests: 0,
                attending: false
            }
        });
    }

    addGuest({id}) {
        this._store.dispatch({
            type: "ADD_GUESTS",
            payload: id
        });
    }

    removeGuest({id}) {
        this._store.dispatch({
            type: "REMOVE_GUESTS",
            payload: id
        });
    }

    removePerson({id}) {
        this._store.dispatch({
            type: "REMOVE_PERSON",
            payload: id
        });
    }

    toggleAttending({id}) {
        this._store.dispatch({
            type: "TOGGLE_ATTENDING",
            payload: id
        });
    }

    updateFilter(filter) {
        this._store.dispatch({type: filter});
    }
}