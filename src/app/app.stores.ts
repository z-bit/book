import { counterReducer } from './book/ngrx/party/counter/counter.reducer';
import { filter } from './book/ngrx/party/filter.reducer';
import { people } from './book/ngrx/party/people.reducer';

export const stores = {
    counter: counterReducer,
    filter,
    people
};