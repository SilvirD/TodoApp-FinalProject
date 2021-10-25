import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Workspace from "./components/Workspace";
import Recent from "./components/Recent";
import Bookmark from "./components/Bookmark";
import Notification from "./components/Notification";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <NavBar />

          <Switch>
            <Route exact path="/">
              <Workspace />
            </Route>
            <Route exact path="/recent">
              <Recent />
            </Route>
            <Route exact path="/bookmark">
              <Bookmark />
            </Route>
            <Route exact path="/notification">
              <Notification />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
