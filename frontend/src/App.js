import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import PopularScreen from "./screens/PopularScreen/PopularScreen";
import Login from "./screens/AuthScreens/Login";
import FavouriteScreen from "./screens/FavouriteScreen/FavouriteScreen";
import MovieDetails from "./screens/MovieDetailsScreen/MovieDetails";
import Registration from "./screens/AuthScreens/Registration";

const App = () => {
  return (
    <Router>
      <Header/>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Registration} />
      <Route path="/favourite" exact component={FavouriteScreen} />
      <Route path="/popular/:pageNumber" exact component={PopularScreen} />
      <Route path="/popular" exact component={PopularScreen} />
      <Route path="/discover/:pageNumber" exact component={HomeScreen} />
      <Route path="/discover" exact component={HomeScreen} />
      <Route path="/" exact component={HomeScreen} />
      <Route path="/movie/:id" exact component={MovieDetails} />
    </Router>
  );
}

export default App;
