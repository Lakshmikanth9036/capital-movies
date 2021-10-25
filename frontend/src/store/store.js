import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  movieListReducer,
  popularMovieListReducer,
  latestMovieReducer,
  favouriteMovieListReducer,
  addMovieTofavouriteListReducer,
  removeMovieFromfavouriteListReducer,
  movieDetailsReducer
} from "./reducers/movieReducer";
import {
  userLoginReducer, userRegisterReducer
} from "./reducers/userReducer";

const reducer = combineReducers({
  movieList: movieListReducer,
  popularMovieList: popularMovieListReducer,
  latestMovie: latestMovieReducer,
  userLogin: userLoginReducer,
  favouriteMovieList: favouriteMovieListReducer,
  addMovieTofavouriteList: addMovieTofavouriteListReducer,
  removeMovieFromfavouriteList: removeMovieFromfavouriteListReducer,
  movieDetails: movieDetailsReducer,
  userRegister: userRegisterReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
