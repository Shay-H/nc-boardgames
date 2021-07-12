import "./App.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Switch>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
