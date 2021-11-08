import "../../dist/styles/Workspace.css";
import { useState, useEffect } from "react";
import FormModal from "../Workspace/FormModal";
import Card from "../Workspace/Card";
import axios from "axios";

const Workspace = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cardInfo, setCardInfo] = useState([]);

  let userToken = localStorage.getItem("tokenLogin");

  useEffect(() => {
    handleSubmitForm()
  }, []);

  const handleSubmitForm = () => {
    axios
    .get(`http://localhost:5005/workspace/user/${userToken}`)
    .then((response) => {
      setCardInfo(response.data);
    });
  }

  return (
    <div className="workspace">
      <div className="toolbar">
        <button className="btn-create" onClick={() => setIsOpen(true)}>
          Tạo không gian mới
        </button>
      </div>

      <FormModal
        open={isOpen}
        cInfo={cardInfo}
        setCardInfo={() => setCardInfo(cardInfo)}
        onClose={() => setIsOpen(false)}
        onModalSubmit={handleSubmitForm}
      />

      <div className="browser">
        <h1>Không gian của bạn</h1>

        <div className="bar">
          {cardInfo.map((card, index) => (
            <Card
              key={index}
              name={card.workspace_name}
              description={card.description}
            />
          ))}
          {/* <Card name={cardInfo[0].name} description={cardInfo[0].description} /> */}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
