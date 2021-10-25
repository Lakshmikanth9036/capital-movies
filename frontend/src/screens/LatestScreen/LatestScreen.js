import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../components/Movie/MovieCard";
import { movieLatest } from "../../store/actions/movieActions";
import './LatestScreen.css';

const LatestScreen = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(movieLatest());
    }, [dispatch]);
  
    const movieList = useSelector((state) => state.latestMovie);
    const { movie } = movieList;
  
    return (
      <>
        <h2 className="headline">Latest Movies</h2>
        <div className="bd-grid grid">
            <MovieCard key={movie.id} movieDetails={movie} />
        </div>
       
      </>
    );
}

export default LatestScreen
