import Axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

export const getListMovie = ( pageID) => {
    return async ( dispatch ) => {
        try {
            console.log(process.env)
            const API_LIST_MOVIE = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${pageID}`;
            const respond = await Axios.get(API_LIST_MOVIE);
            dispatch({ type: "GET_LIST_MOVIE", payload: respond.data });
        } catch ( err ) {
            console.log(err);
        };
    };
};

export const getMoviesByKeyword = (keyword) => {
    return async ( dispatch ) => {
        try {
            const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}`;
            const respond = await Axios.get(API_URL);
            dispatch({ type: 'GET_LIST_MOVIE', payload: respond.data });
        } catch ( err ) {
            console.log(err);
        }
    }
}

export const getDetailMovie = ( id ) => {
    return async ( dispatch ) => {
        try {
            const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
            const respond = await Axios.get(API_URL);
            dispatch({ type: "GET_DETAIL_MOVIE", payload: respond.data });
        } catch ( err ) {
            console.log(err);
        };
    };
};

export const getRateMoviesByGuest = (guest_session_id) => {
    return async ( dispatch ) => {
        try {
            const API_URL = `https://api.themoviedb.org/3/guest_session/${guest_session_id}/rated/movies?api_key=${API_KEY}&sort_by=created_at.asc`;
            const respond = await Axios.get(API_URL);
            dispatch({ type: 'GET_RATE_MOVIES', payload: respond.data.results });
        } catch ( err ) {
            console.log(err);
        }
    }
}

export const updateRateMovies = ( movieId, rate, guest_session_id ) => {
    return async ( dispatch ) => {
        try {
            const API_URL = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guest_session_id}`;
            const respond = await Axios.post(API_URL, {
                'value' : rate
            });
            dispatch({ type: "POST_RATE_MOVIE", payload: respond.data });
        } catch ( err ) {
            console.log(err);
        }
    }
};

export const getGuestSession = () => {
    return async ( dispatch ) => {
        try {
            const API_URL = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`;
            const respond = await Axios.get(API_URL);

            localStorage.setItem("guest_session_id", respond.data.guest_session_id);
            dispatch({ type: 'GET_GUEST_ID', payload: respond.data });
        } catch ( err ) {
            console.log(err);
        }
    }
}

export const getSimilarMovies = (movieID) => {
    return async ( dispatch ) => {
        try {
            const API_URL = `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${API_KEY}`;
            const respond = await Axios.get(API_URL);

            dispatch({ type: 'GET_SIMILAR_MOVIES', payload: respond.data });
        } catch ( err ) {
            console.log(err)
        }
    }
}

export const getVideoMovieDetail = (movieID) => {
    return async ( dispatch ) => {
        try {
            const API_URL = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${API_KEY}`;
            const respond = await Axios.get(API_URL);

            dispatch({ type: 'GET_VIDEO_MOVIE_DETAIL', payload: respond.data });
        } catch ( err ) {
            console.log(err);
        }
    }
}