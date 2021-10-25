import mongoose from "mongoose";
import { boolean } from "webidl-conversions";

const movieSchema = mongoose.Schema(
  {
    users: [
      {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User"
      },
    ],
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    original_title: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    backdrop_path: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
    vote_average: {
      type: Number,
      required: true,
    }, 
    isFavourite: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
