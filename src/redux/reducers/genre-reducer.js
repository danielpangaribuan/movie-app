const initial_state = {
    data: []
}

export const GenreReducer = ( state = initial_state, action ) => {
    switch ( action.type ) {
        case "GET_LIST_GENRE" :
            return { ...state, data: action.payload }
        default :
            return state;
    };
};