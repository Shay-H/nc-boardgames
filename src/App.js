import "./css/App.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import Games from "./components/Games";
import Reviews from "./components/Reviews";
import Users from "./components/Users";
import User from "./components/User";
import Review from "./components/Review";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import PageNotFound from "./components/PageNotFound";

function App() {
  const [user, setUser] = useState({
    username: "tickle122",
    avatar_url:
      "https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg",
    name: "Tom Tickle",
  });

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Header setUser={setUser} />
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
            <Users setUser={setUser} />
          </Route>
          <Route path="/">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
