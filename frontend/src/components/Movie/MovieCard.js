import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovieFavouriteList, removeMovieFavouriteList } from "../../store/actions/movieActions";
import "./MovieCard.css";
import { withRouter } from 'react-router-dom';

const MovieCard = ({ movieDetails, history, pageClass }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addMovieToFav = () => {
    if(!userInfo){
      history.push("/login")
    }
    dispatch(addMovieFavouriteList(movieDetails, pageClass))
  }

  const removeMovieFromFav = () => {
    dispatch(removeMovieFavouriteList({id: movieDetails.id}, pageClass))
  }

  const getMovieById = () =>{
    history.push("/movie/"+movieDetails.id)
  }

  return (
    <div className="main">
      <div className="movie__img">
        <img
          src={`https://image.tmdb.org/t/p/original` + movieDetails.poster_path}
          alt="poster"
          className="poster__img"
        />
        {movieDetails.isFavourite ? <div onClick={removeMovieFromFav}><i className="f fas fa-heart fav"></i> </div>:
        <div onClick={removeMovieFromFav}><i className="f fas fa-heart n-fav" onClick={addMovieToFav}></i></div>}
      </div>
      <div className="title">{movieDetails.original_title}</div>
      <div className="imdb">
        <img src="/assets/logo-imdb.svg" alt="imdb" className="imdb__logo" />
        <div>
          <p className="imdb__rating">
            {movieDetails.vote_average.toFixed(1)}/10
          </p>
          <i className="fas fa-star"></i>
        </div>
      </div>
      <div className="head1 centered">
        <div className="lang">
          <p>Lang</p>
          <h4>{movieDetails.original_language}</h4>
        </div>
        <div className="review">
          <p>Review</p>
          <h4>{movieDetails.vote_count}</h4>
        </div>
        <div className="release">
          <p>Release</p>
          <h4>{movieDetails.release_date}</h4>
        </div>
      </div>
      <div className="btn__container">
        <button className="btn" onClick={getMovieById}>View Details</button>
      </div>
    </div>
  );
};

export default withRouter(MovieCard);
