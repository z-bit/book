import { Component } from '@angular/core';

@Component({
    selector: 'person-list',
    inputs: ['people'],
    template: `<div>
        <ul>
            <li *ngFor="let person of people">
                {{ person.name }}
                Guests: {{ person.guests }}
                <button (click)="addGuest()">+</button>
                <button *ngIf="person.guests>0" (click)="removeGuest()">-</button>
                <md-checkbox
                    [checked]="person.attending"
                    (change)="toggleAtending()"
                >
                    Attending?
                </md-checkbox>
                <button md-raised-button (click)="removePerson()">Delete</button>
            </li>
        </ul>
    </div>`
})
export class PersonList {

}