export interface Action {
    type: string;
    payload?: any;
}

export interface Reducer<Type> {
    (state: Type, action: Action): Type;
}