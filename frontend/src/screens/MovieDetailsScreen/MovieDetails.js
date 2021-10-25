import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsMovie, addMovieFavouriteList, removeMovieFavouriteList } from "../../store/actions/movieActions";
import Loader from "../../UI/Loader/Loader";
import "./MovieDetails.css";

const MovieDetails = ({ match, history }) => {
  const movieId = match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsMovie(movieId));
  }, [dispatch, movieId]);

  const movieD = useSelector((state) => state.movieDetails);
  const { mDetails, loading } = movieD;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const releaseDate = new Date(mDetails.release_date);

  const timeConvert = (n) => {
    const num = n;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + "hr " + rminutes + "min";
  };

  const addMovieToFav = () => {
    if(!userInfo){
      history.push("/login")
    }
    dispatch(addMovieFavouriteList(mDetails, "movieDetails"))
  }

  const removeMovieFromFav = () => {
    dispatch(removeMovieFavouriteList({id: mDetails.id}, "movieDetails"))
  }


  return (
    <>
   {loading ? (<Loader/>) : mDetails.id && (<div className="bd-grid">
      <div className="movie__detail__container">
        <div className="movie__img__con">
          <img
            className="movie_detail__img"
            src={`https://image.tmdb.org/t/p/original${mDetails.poster_path}`}
            alt="book-img"
          />
           {mDetails.isFavourite ? <div onClick={removeMovieFromFav}><i className="ff fas fa-heart fav"></i> </div>:
        <div onClick={removeMovieFromFav}><i className="ff fas fa-heart n-fav" onClick={addMovieToFav}></i></div>}
          {/* <i className="fas fa-heart ff n-fav"></i> */}
        </div>
        <div className="movie__details">
          <div className="movie__detail pl-3">{mDetails.original_title}</div>
          <div className="movie__detail pl-3 mt-3">
            {releaseDate.getFullYear()}
          </div>
          <div className="movie__genres pl-3">
            {mDetails.genres.map((g, i) => (
              <span key={i} className="movie__detail">
                {g.name} {mDetails.genres.length !== i + 1 && "/"}{" "}
              </span>
            ))}
          </div>
          <div className="movie__detail pl-3 mt-3">
            {timeConvert(mDetails.runtime)}
          </div>
          <div className="movie__detail pl-3 mt-3">
            {mDetails.spoken_languages.map((e, i) => (
              <span key={i} className="movie__detail">
                {e.name} {mDetails.spoken_languages !== i + 1 && "/"}{" "}
              </span>
            ))}
          </div>

          <div className="movie__detail pl-3 mt-3">
            {mDetails.production_countries.map((c, i) => (
              <span key={i} className="movie__detail">
                {c.name} {mDetails.production_countries !== i + 1 && "/"}{" "}
              </span>
            ))}
          </div>

          <div className="movie__review">
            <i className="fas fa-heart fh"></i>
            <p className="review__count">{mDetails.vote_count}</p>
          </div>
          <div className="movie__imdb">
            <img
              src="/assets/logo-imdb.svg"
              alt="imdb"
              className="imdb__logo"
            />
            <div>
              <p className="imdb__rating">
                {mDetails.vote_average.toFixed(1)}/10
              </p>
              <i className="fas fa-star"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="movie__detail mt-3">Overview: </div>
      <div className="movie__overview">{mDetails.overview}</div>
      <div className="movie__detail mt-3">Production Companies:</div>
      <div className="movie__prod__detail">
        {mDetails.production_companies.map((p, i) => (
         p.logo_path  && <div key={i} className="prod__details">
            <img
              src={`https://image.tmdb.org/t/p/w500${p.logo_path}`}
              alt={p.name}
              className="prod__img"
            />
            <div className="prod__name">{p.name}</div>
          </div>
        ))}
      </div>
    </div>)}
    </>
  );
};

export default MovieDetails;
