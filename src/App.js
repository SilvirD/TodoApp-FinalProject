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
            <Route exact path="/" component={Workspace} />
            <Route exact path="/recent" component={Recent} />
            <Route exact path="/bookmark" component={Bookmark} />
            <Route exact path="/notification" component={Notification}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
