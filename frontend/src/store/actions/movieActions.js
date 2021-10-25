import * as actionType from "./actionsTypes";
import axios from "axios";

export const listMovies =
  (pageNumber = "") =>
  async (dispatch,getState) => {
    try {
      dispatch({ type: actionType.MOVIE_LIST_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      let config;

      if(userInfo){
      config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        }
      }
    }
      const { data } = await axios.get(`/capital/movies?pageNo=${pageNumber}`, config && config);
      dispatch({ type: actionType.MOVIE_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: actionType.MOVIE_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

  export const detailsMovie =
  (id) =>
  async (dispatch,getState) => {
    try {
      dispatch({ type: actionType.MOVIE_DETAILS_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      let config;

      if(userInfo){
      config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        }
      }
    }
      const { data } = await axios.get(`/capital/movies/${id}`, config && config);
      dispatch({ type: actionType.MOVIE_DETAILS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: actionType.MOVIE_DETAILS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const popularMoviesList =
  (pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: actionType.POPULAR_MOVIE_LIST_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      let config;

      if(userInfo){
      config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        }
      }
    }
      const { data } = await axios.get(
        `/capital/movies/popular?pageNo=${pageNumber}`,config && config
      );
      dispatch({ type: actionType.POPULAR_MOVIE_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: actionType.POPULAR_MOVIE_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const movieLatest = () => async (dispatch) => {
  try {
    dispatch({ type: actionType.LATEST_MOVIE_REQUEST });
    const { data } = await axios.get(`/capital/movies/latest`);
    dispatch({ type: actionType.LATEST_MOVIE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionType.LATEST_MOVIE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const moviesFavouriteList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.FAVOURITE_MOVIE_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(
      `/capital/movies/favourite`,config
    );
    dispatch({ type: actionType.FAVOURITE_MOVIE_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionType.FAVOURITE_MOVIE_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const addMovieFavouriteList = (movie, pageClass) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.ADD_FAVOURITE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const {
      movieDetails: { mDetails },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.put(
      `/capital/movies/favourite`,movie,config
    );
    dispatch({ type: actionType.ADD_FAVOURITE_SUCCESS});
    pageClass==="home" && dispatch(listMovies())
    pageClass==="popular" && dispatch(popularMoviesList())
    pageClass==="movieDetails" && dispatch(detailsMovie(mDetails.id))
  } catch (err) {
    dispatch({
      type: actionType.ADD_FAVOURITE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const removeMovieFavouriteList = (id,pageClass) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.REMOVE_FAVOURITE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const {
      movieDetails: { mDetails },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.put(
      `/capital/movies/rm/favourite`,id,config
    );
    dispatch({ type: actionType.REMOVE_FAVOURITE_SUCCESS });
    pageClass==="home" && dispatch(listMovies())
    pageClass==="popular" && dispatch(popularMoviesList())
    pageClass==="favourite" && dispatch(moviesFavouriteList())
    pageClass==="movieDetails" && dispatch(detailsMovie(mDetails.id))
  } catch (err) {
    dispatch({
      type: actionType.REMOVE_FAVOURITE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};