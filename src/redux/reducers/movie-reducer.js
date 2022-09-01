const initial_state = {
    data: [],
    detail: {},
    rateList: [],
    similarMovie: {}
};

export const MovieReducer = ( state = initial_state, action ) => {
    switch (action.type) {
        case "GET_LIST_MOVIE":
            return { ...state, data: action.payload }
        case "GET_DETAIL_MOVIE":
            return { ...state, detail: action.payload }
        case "GET_RATE_MOVIES":
            return { ...state, rateList: action.payload }
        case "GET_SIMILAR_MOVIES":
            return { ...state, similarMovie: action.payload }
        default:
            return state;
    }
}