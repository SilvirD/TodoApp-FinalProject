import { useHistory } from "react-router";

const Notification = () => {
  let userToken = localStorage.getItem("tokenLogin");
  const history = useHistory();

  if (!userToken) {
    history.push('/login')
  }

  return <p>Notification</p>;
};

export default Notification;
