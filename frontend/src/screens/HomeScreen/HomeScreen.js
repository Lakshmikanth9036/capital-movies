import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../components/Movie/MovieCard";
import Pagination from "../../components/Pagination/Pagination";
import { listMovies } from "../../store/actions/movieActions";
import "./HomeScreen.css";

const HomeScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listMovies(pageNumber));
  }, [dispatch, pageNumber]);

  const movieList = useSelector((state) => state.movieList);
  const { movies } = movieList;

  return (
    <>
      <div className="bd-grid grid">
        {movies.results && movies.results.map((movie) => (
          <MovieCard key={movie.id} movieDetails={movie} pageClass="home"/>
        ))}
      </div>
      <Pagination
        endPoint="/discover/"
        currentPage={movies.currentPage}
        previousPage={movies.previousPage}
        nextPage={movies.nextPage}
        lastPage={movies.total_pages}
        hasNextPage={movies.hasNextPage}
        hasPreviousPage={movies.hasPreviousPage}
      />
    </>
  );
};

export default HomeScreen;
