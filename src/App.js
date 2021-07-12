import "./App.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import Games from "./components/Games";
import Reviews from "./components/Reviews";
import Users from "./components/Users";
import User from "./components/User";
import Review from "./components/Review";

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/games">
          <Games />
        </Route>
        <Route path="/reviews/:review_id">
          <Review />
        </Route>
        <Route exact path="/reviews">
          <Reviews />
        </Route>
        <Route exact path="/users/:username">
          <User />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
