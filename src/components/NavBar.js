import { AiOutlineNumber, AiOutlineUser } from "react-icons/ai";

const NavBar = () => {
  const ICONSIZE = 24;

  return (
    <div className="navbar">
      <h1 className="navlink-props flex font-black">
        <AiOutlineNumber size={ICONSIZE} /> greello
      </h1>

      <div className="space-x-10">
        <a className="navlink-props" href="/">
          Workspaces
        </a>
        <a className="navlink-props" href="/">
          Gần đây
        </a>
        <a className="navlink-props" href="/">
          Đánh dấu
        </a>
        <a className="navlink-props" href="/">
          Thông báo
        </a>
      </div>

      <div className="profile">
        <AiOutlineUser size={ICONSIZE} />
      </div>
    </div>
  );
};

export default NavBar;
