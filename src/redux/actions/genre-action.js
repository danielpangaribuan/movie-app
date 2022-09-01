import Axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;
const API_GENRE = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

export const getListGenre = () => {
    return async ( dispatch ) => {
        try {
            const respond = await Axios.get(API_GENRE);
            dispatch({ type: "GET_LIST_GENRE", payload: respond.data.genres });
        } catch ( err ) {
            console.log(err);
        }
    }
}