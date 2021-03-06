import { AiOutlineNumber, AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

import "./NavBar.scss";


const NavBar = ({ userModal, setUserModal, mobileMenu, setMobileMenu, loginState }) => {

  const ICONSIZE = 24;


  const toggleMobileMenu = (mobileMenu) => {
    if (!mobileMenu) {
      setMobileMenu(!mobileMenu);
    }
  };

  const toggleProfileDialog = (userModal) => {
    if (!userModal) {
      setUserModal(!userModal);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="brand-section">
        <AiOutlineNumber size={ICONSIZE} /> greello
        </Link>

      {
        loginState &&
        <div className="navlinks">
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
      }

      <div className="flex absolute top-0.5 right-3">
        <div
          onClick={(_) => toggleProfileDialog(userModal)}
          className="profile"
        >
          <AiOutlineUser size={ICONSIZE} />
        </div>
        {loginState && <div onClick={(_) => toggleMobileMenu(mobileMenu)} className="menu">
          <AiOutlineMenu size={ICONSIZE} />
        </div>}
      </div>
    </nav>
  );
};

export default NavBar;
