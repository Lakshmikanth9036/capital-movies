import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../components/Movie/MovieCard";
import { moviesFavouriteList } from "../../store/actions/movieActions";
import "./FavouriteScreen.css";
import { Link } from "react-router-dom";

const FavouriteScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(moviesFavouriteList());
    }, [dispatch]);
  
    const movieList = useSelector((state) => state.favouriteMovieList);
    const { favMovies } = movieList;

  return (
    <div className="bd-grid grid">
      {favMovies && favMovies.length >0   ?
        favMovies.map((movie) => (
          <MovieCard key={movie.id} movieDetails={movie} pageClass="favourite"/>
        )) :  <div className="main-empty__fav">
        <div className="empty__fav">
            <div className="empty__fav-text">You have no favourites</div>
            <Link
              to="/discover" className="empty__fav-shop-now-btn">Start Exploring</Link>
        </div>
        </div>}
    </div>
  );
};

export default FavouriteScreen;
