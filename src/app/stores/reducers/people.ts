interface People {
    id: number,

}

export const people = (state=[], action) => {
    // return new state
    switch (action.type) {
        case "ADD_PERSON":
            return [
                ...state,
                action.payload
            ];
        case "REMOVE_PERSON":
            return state.filter(person =>
                person.id !== action.payload
            );

        case "ADD_GUESTS":
            return state.map(person => {
                if (person.id == action.payload) {
                    return Object.assign({}, person, {
                        guests: person.guests + 1
                    });
                }
            });

        case "REMOVE_GUESTS":
            return state.map(person => {
                if (person.id == action.payload) {
                    return Object.assign({}, person, {
                        guests: person.guests - 1
                    });
                }
            });

        case "TOGGLE_ATTENDING":
            return state.map(person => {
                if (person.id == action.payload) {
                    return Object.assign({}, person, {
                        attending: person.attending
                    });
                }
            });
        default:
            return state;
    }
}