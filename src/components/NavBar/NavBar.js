import { useState } from "react";
import { AiOutlineNumber, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import Button from "./Button";

const NavBar = ({ userModal, setUserModal }) => {
  const ICONSIZE = 24;
  const [expandState, setExpandState] = useState(false);
  const [navlinks, setNavLink] = useState("navlinks");

  const toggleMobileMenu = (expandState) => {
    console.log(expandState)
    setExpandState(!expandState);

    if (expandState) {
      setNavLink("navlinks");
    } else {
      setNavLink("navlinks activebar");
    }
  };

  const toggleProfileDialog = (userModal) => {
    console.log(userModal)
    if (!userModal) {
      setUserModal(!userModal)
    }
  }

  return (
    <nav className="navbar">
      <h1 className="brand-section">
        <AiOutlineNumber size={ICONSIZE} /> greello
      </h1>

      <div className={navlinks}>
        <ul>
          <li>
            <Link to="/">Không gian</Link>
          </li>
          <li>
            <Link to="/recent">Gần đây</Link>
          </li>
          <li>
            <Link to="/bookmark">Đánh dấu</Link>
          </li>
          <li>
            <Link to="/notification">Thông báo</Link>
          </li>
        </ul>
      </div>

      <div className="flex absolute top-1 right-3">
        <div onClick={_ => toggleProfileDialog(userModal)} className="profile">
          <AiOutlineUser size={ICONSIZE} />
        </div>
        <div onClick={_ => toggleMobileMenu(expandState)} className="menu">
          <Button expandState={expandState} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
