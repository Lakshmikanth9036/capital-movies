import express from 'express';
import movieRoutes from "./routes/movies.js";
import userRoutes from "./routes/users.js";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/error.js";
import connectDB from "./config/db.js";
import path from "path";

connectDB();

const app = express();
app.use(express.json());


app.use("/capital/movies", movieRoutes);
app.use("/capital/users", userRoutes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);