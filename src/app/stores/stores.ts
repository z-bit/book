import { counterReducer } from './reducers/counterReducer';
import { filter } from './reducers/filter';
import { people } from './reducers/people';

export const stores = {
    counter: counterReducer,
    filter,
    people
};