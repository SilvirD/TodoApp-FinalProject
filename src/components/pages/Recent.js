import { useHistory } from "react-router";
import Table from "../TableUI/Table";

const Recent = () => {
  let userToken = localStorage.getItem("tokenLogin");
  const history = useHistory();

  if (!userToken) {
    history.push('/login')
  }

  return (
    <>
      <Table></Table>
    </>
  );
};

export default Recent;
