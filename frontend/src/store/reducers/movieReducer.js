import * as actionType from "../actions/actionsTypes";

export const movieListReducer = (state = { movies: {} }, action) => {
  switch (action.type) {
    case actionType.MOVIE_LIST_REQUEST:
      return { loading: true, movies: {} };
    case actionType.MOVIE_LIST_SUCCESS:
      return { loading: false, movies: action.payload };
    case actionType.MOVIE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const movieDetailsReducer = (state = { mDetails: {} }, action) => {
  switch (action.type) {
    case actionType.MOVIE_DETAILS_REQUEST:
      return { loading: true, mDetails: {} };
    case actionType.MOVIE_DETAILS_SUCCESS:
      return { loading: false, mDetails: action.payload };
    case actionType.MOVIE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const popularMovieListReducer = (state = { movies: {} }, action) => {
  switch (action.type) {
    case actionType.POPULAR_MOVIE_LIST_REQUEST:
      return { loading: true, movies: {} };
    case actionType.POPULAR_MOVIE_LIST_SUCCESS:
      return { loading: false, movies: action.payload };
    case actionType.POPULAR_MOVIE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const latestMovieReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case actionType.LATEST_MOVIE_REQUEST:
      return { loading: true, movie: {} };
    case actionType.LATEST_MOVIE_SUCCESS:
      return { loading: false, movie: action.payload };
    case actionType.LATEST_MOVIE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const favouriteMovieListReducer = (state = { favMovies: [] }, action) => {
  switch (action.type) {
    case actionType.FAVOURITE_MOVIE_LIST_REQUEST:
      return { loading: true, favMovies: [] };
    case actionType.FAVOURITE_MOVIE_LIST_SUCCESS:
      return { loading: false, favMovies: action.payload };
    case actionType.FAVOURITE_MOVIE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addMovieTofavouriteListReducer = (state = {} , action) => {
  switch (action.type) {
    case actionType.ADD_FAVOURITE_REQUEST:
      return { loading: true };
    case actionType.ADD_FAVOURITE_SUCCESS:
      return { loading: false};
    case actionType.ADD_FAVOURITE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeMovieFromfavouriteListReducer = (state = {} , action) => {
  switch (action.type) {
    case actionType.REMOVE_FAVOURITE_REQUEST:
      return { loading: true };
    case actionType.REMOVE_FAVOURITE_SUCCESS:
      return { loading: false};
    case actionType.REMOVE_FAVOURITE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
