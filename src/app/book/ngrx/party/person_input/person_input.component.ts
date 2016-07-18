import { Component, EventEmitter } from '@angular/core';

@Component({
    selector: 'person-input',
    outputs: ['addPerson'],
    template: `<div>
        <h3>Add a Person</h3>
        <md-input placeholder="Person" #p></md-input>
        &nbsp;
        <button md-raised-button (click)="add_person(p)">Add Person</button>
    </div>`
})
export class PersonInput {
    public addPerson: EventEmitter = new EventEmitter();

    add_person(person) {
        this.addPerson.emit(person);
    }
}