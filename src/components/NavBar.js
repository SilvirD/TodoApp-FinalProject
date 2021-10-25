import { useState } from "react";
import { AiOutlineNumber, AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const NavBar = () => {
  const ICONSIZE = 24;
  const [navlinks, setNavLink] = useState("navlinks");
  let navState = false;
  const toggleMobileMenu = () => {
    if (!navState) {
      setNavLink("navlinks active");
    } else {
      setNavLink("navlinks");
    }
  };

  return (
    <nav className="navbar">
      <h1 className="cursor-pointer p-3 rounded-md hover:bg-green-500 flex font-black">
        <AiOutlineNumber size={ICONSIZE} /> greello
      </h1>

      <div className={navlinks}>
        <ul>
          <li>
            <Link to="/">Workspaces</Link>
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

      <div className="flex">
        <div className="profile">
          <AiOutlineUser size={ICONSIZE} />
        </div>
        <div onClick={toggleMobileMenu} className="menu">
          <AiOutlineMenu size={ICONSIZE} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
