import NavBar from "./components/navbar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Workspace from "./components/pages/Workspace";
import Recent from "./components/pages/Recent";
import Bookmark from "./components/pages/Bookmark";
import Notification from "./components/pages/Notification";

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
