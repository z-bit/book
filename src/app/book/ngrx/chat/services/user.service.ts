import { Injectable, bind } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs/Rx';
import { User } from '../models';

/**
 * UserService manages the current user
 */
@Injectable()
export class UserService {
    currentUser: Subject<User> = new BehaviorSubject<User>(null);

    public setCurrentUser(newUser: User): void {
        this.currentUser.next(newUser);
    }
}

export var userServiceInjectables: Array<any> = [
    bind(UserService).toClass(UserService)
];