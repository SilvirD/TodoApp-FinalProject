import { useHistory } from "react-router";

const Bookmark = () => {
  let userToken = localStorage.getItem("tokenLogin");
  const history = useHistory();

  if (!userToken) {
    history.push('/login')
  }

  return <div>Bookmark</div>;
};

export default Bookmark;
