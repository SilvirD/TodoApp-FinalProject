import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Workspace from "./components/pages/Workspace";
import Recent from "./components/pages/Recent";
import Bookmark from "./components/pages/Bookmark";
import Notification from "./components/pages/Notification";
import UserDialog from "./components/common/UserDialog";
import MobileMenu from "./components/common/MobileMenu";
import { useState } from "react";
import Table from "./components/Table/Table";

function App() {
  const [userModal, setUserModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <Router>
        <div className="App">
          <NavBar
            userModal={userModal}
            setUserModal={setUserModal}
            mobileMenu={mobileMenu}
            setMobileMenu={setMobileMenu}
          />
          <UserDialog userModal={userModal} setUserModal={setUserModal} />
          <MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />

          <Switch>
            <Route exact path="/" component={Workspace} />
            <Route exact path="/recent/:id" component={Recent} />
            <Route exact path="/bookmark" component={Bookmark} />
            <Route exact path="/notification/:id" component={Table} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
