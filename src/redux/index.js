import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";

import { MovieReducer } from "./reducers/movie-reducer";
import { GenreReducer } from "./reducers/genre-reducer";

const Reducers = combineReducers({
    movie: MovieReducer,
    genre: GenreReducer
});

export const createReduxStore = () => 
    createStore(Reducers, composeWithDevTools(applyMiddleware(ReduxThunk)));