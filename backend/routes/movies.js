import express from "express";
import {
    getMovies,
    getMovieById,
    getPopularMovies,
    getLatestMovie,
    addMoviesToFav,
    getFavMovies,
    rmvMovieFromFav
} from "../controller/movies.js";
import {protect, ifAuthUser} from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(ifAuthUser, getMovies);
router.route("/popular").get(ifAuthUser, getPopularMovies);
router.route("/latest").get(getLatestMovie);
router.route("/favourite").put(protect, addMoviesToFav);
router.route("/favourite").get(protect, getFavMovies);
router.route("/rm/favourite").put(protect, rmvMovieFromFav);
router.route("/:id").get(ifAuthUser,getMovieById);

export default router;
