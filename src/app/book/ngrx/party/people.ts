/*
{
    type: string,
    payload?: any
}
 */

export const people = (state=[], action) => {
    // return new state
    switch (action.type) {
        case "ADD_PERSON":
            return [
                ...state,
                action.payload
            ];
        case "REMOVE_PERSON":

            return state;

        case "ADD_GUESTS":

            return state;

        case "REMOVE_GUESTS":

            return state;

        case "TOGGLE_ATTENDING":

            return state;
        default:
            return state;
    }
}