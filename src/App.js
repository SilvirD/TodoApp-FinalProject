import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Workspace from "./components/pages/Workspace";
import Recent from "./components/pages/Recent";
import Bookmark from "./components/pages/Bookmark";
import Notification from "./components/pages/Notification";
import Home from "./components/pages/Home"
import UserDialog from "./components/common/UserDialog";
import MobileMenu from "./components/common/MobileMenu";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import TableDetail from "./components/TableDetail/TableDetail";
import imageList from "./images/index";

function App() {
  const [userModal, setUserModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loginState, setLogState] = useState(localStorage.getItem("tokenLogin"))

  const imgList = Object.values(imageList);
  const randImg = imgList[Math.floor(Math.random() * imgList.length)];
  let userToken = localStorage.getItem("tokenLogin");
  const history = useHistory();

  const [background, setBackground] = useState("");

  useEffect(() => {
    setBackground(randImg);
  }, []);

  return (
    <>
      <Router>
        <div
          className="App"
          style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            height: "100%",
          }}
        >
          <NavBar
            userModal={userModal}
            setUserModal={setUserModal}
            mobileMenu={mobileMenu}
            setMobileMenu={setMobileMenu}
            loginState={loginState}
          />
          <UserDialog userModal={userModal} setUserModal={setUserModal}
          loginState={loginState} setLogState={setLogState} />
          <MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />

          <Switch>
            <Route exact path="/login">
              <Login loginState={loginState} setLogState={setLogState} />
              </Route>
            <Route exact path="/register" component={Register} />
            <Route exact path="/home" component={Home} />

            <Route exact path="/" component={Workspace} />
            <Route exact path="/recent/:id" component={Recent} />
            <Route exact path="/bookmark" component={Bookmark} />
            <Route exact path="/notification/:id" component={TableDetail} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
