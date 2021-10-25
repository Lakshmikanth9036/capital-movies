import dotenv from "dotenv";
import request from "request";
import asyncHandler from "express-async-handler";
import Movie from "../models/movie.js";
dotenv.config();

const ITEMS_PRE_PAGE = 20;

/**
 * @desc Fetch all movies
 * @route GET /capital/movies
 * @access Public
 */
const getMovies = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNo) || 1;

  const user = req.user && req.user._id;
  const favMovies = user && (await Movie.find({ users: user }));
  request(
    process.env.MOVIEDB_URL +
      "/discover/movie?api_key=" +
      process.env.API_KEY +
      "&page=" +
      page,
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(body);
        data.currentPage = page;
        data.hasNextPage = ITEMS_PRE_PAGE * page < data.total_results;
        data.hasPreviousPage = page > 1;
        data.nextPage = page + 1;
        data.previousPage = page - 1;
        if (favMovies) {
          data.results.map((m) => {
            let isPresent = false;
            favMovies.map((fm) => {
              if (m.id === fm.id) {
                isPresent = true;
              }
            });
            isPresent ? (m.isFavourite = true) : (m.isFavourite = false);
          });
        }
        res.json(data);
      }
    }
  );
});

/**
 * @desc Fetch single movie details
 * @route GET /capital/movies/:id
 * @access Public
 */
const getMovieById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = req.user && req.user._id;
  const favMovies = user && (await Movie.find({ users: user }));
  request(
    process.env.MOVIEDB_URL +
      "/movie/" +
      id +
      "?api_key=" +
      process.env.API_KEY,
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(body);
        if (favMovies) {
          favMovies.map((fm) => {
            if (fm.id.toString() === id.toString()) data.isFavourite = true;
          });
        }
        res.json(data);
      }
    }
  );
});

/**
 * @desc Fetch popular movie
 * @route GET /capital/movies/popular
 * @access Public
 */
const getPopularMovies = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNo) || 1;
  const user = req.user && req.user._id;
  const favMovies = user && (await Movie.find({ users: user }));
  request(
    process.env.MOVIEDB_URL +
      "/movie/popular?api_key=" +
      process.env.API_KEY +
      "&page=" +
      page,
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(body);
        data.currentPage = page;
        data.hasNextPage = ITEMS_PRE_PAGE * page < data.total_results;
        data.hasPreviousPage = page > 1;
        data.nextPage = page + 1;
        data.previousPage = page - 1;
        if (favMovies) {
          data.results.map((m) => {
            let isPresent = false;
            favMovies.map((fm) => {
              if (m.id === fm.id) {
                isPresent = true;
              }
            });
            isPresent ? (m.isFavourite = true) : (m.isFavourite = false);
          });
        }
        res.json(data);
      }
    }
  );
});

/**
 * @desc Fetch latest movie
 * @route GET /capital/movies/latest
 * @access Public
 */
const getLatestMovie = (req, res) => {
  request(
    process.env.MOVIEDB_URL + "/movie/latest?api_key=" + process.env.API_KEY,
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(body);
        res.json(data);
      }
    }
  );
};

/**
 * @desc Add movie to favourites list
 * @route POST /capital/movies/favourite
 * @access Private
 */
const addMoviesToFav = asyncHandler(async (req, res) => {
  const {
    id,
    original_title,
    title,
    overview,
    backdrop_path,
    poster_path,
    release_date,
    vote_average,
  } = req.body;
  const exiMovie = await Movie.findOne({ id });
  if (exiMovie) {
    exiMovie.users.push(req.user._id);
    const updatedFavMovie = await exiMovie.save();
    res.status(201).json(updatedFavMovie);
  } else {
    const movie = new Movie({
      users: [req.user._id],
      id,
      original_title,
      title,
      overview,
      backdrop_path,
      poster_path,
      release_date,
      vote_average,
      isFavourite: true,
    });
    const favMovie = await movie.save();
    res.status(201).json(favMovie);
  }
});

/**
 * @desc Remove movie from favourites list
 * @route PUT /capital/movies/rm/favourite
 * @access Private
 */
const rmvMovieFromFav = asyncHandler(async (req, res) => {
  const movieId = req.body.id;
  const exiMovie = await Movie.findOne({ id: movieId });
  const updateUser = exiMovie.users.filter(
    (uId) => uId.toString() !== req.user._id.toString()
  );
  exiMovie.users = updateUser;
  const curFavMovie = await exiMovie.save();
  res.status(200).json(curFavMovie);
});

/**
 * @desc Get favourites movie list
 * @route GET /capital/movies/favourite
 * @access Private
 */
const getFavMovies = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const favMovies = await Movie.find({ users: user }).select("-users");
  if (favMovies) res.json(favMovies);
  else throw new Error("Some thing went wrong");
});

export {
  getMovies,
  getMovieById,
  getPopularMovies,
  getLatestMovie,
  addMoviesToFav,
  getFavMovies,
  rmvMovieFromFav,
};
