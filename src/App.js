import "./App.css";
import Regisnter from "./components/register";
import Login from "./components/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Regisnter} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
