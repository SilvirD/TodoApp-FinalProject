import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
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

            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
