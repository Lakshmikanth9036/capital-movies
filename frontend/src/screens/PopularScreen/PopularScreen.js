import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../components/Movie/MovieCard";
import Pagination from "../../components/Pagination/Pagination";
import { popularMoviesList } from "../../store/actions/movieActions";
import './PopularScreen.css';

const PopularScreen = ({match}) => {
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(popularMoviesList(pageNumber));
    }, [dispatch, pageNumber]);
  
    const movieList = useSelector((state) => state.popularMovieList);
    const { movies } = movieList;
  
    return (
      <>
        <h2 className="headline">Popular Movies</h2>
        <div className="bd-grid grid">
          {movies.results && movies.results.map((movie) => (
            <MovieCard key={movie.id} movieDetails={movie} pageClass="popular" />
          ))}
        </div>
        <Pagination
          endPoint="/popular/"
          currentPage={movies.currentPage}
          previousPage={movies.previousPage}
          nextPage={movies.nextPage}
          lastPage={movies.total_pages}
          hasNextPage={movies.hasNextPage}
          hasPreviousPage={movies.hasPreviousPage}
        />
      </>
    );
}

export default PopularScreen
