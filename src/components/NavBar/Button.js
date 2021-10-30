import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Button = ({ expandState }) => {
  const ICONSIZE = 24;
  return expandState ? <AiOutlineClose size={ICONSIZE} /> : <AiOutlineMenu size={ICONSIZE} />;
};

export default Button;
