import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { apiClient } from "../../helper/api_client";
import "../../styles/Workspace.scss";
import Card from "../Workspace/Card";
import FormModal from "../Workspace/FormModal";
import { AppstoreOutlined } from "@ant-design/icons";

const Workspace = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [cardInfo, setCardInfo] = useState([]);

  let userToken = localStorage.getItem("tokenLogin");

  useEffect(() => {
    handleSubmitForm();
  }, []);

  const handleSubmitForm = async () => {
    if (userToken) {
      await apiClient.get(`/workspace/user/${userToken}`).then((response) => {
        setCardInfo(response.data);
      });
    }
  };

  const handlePageChange = (id) => {
    history.push(`/recent/${id}`);
  };

  return (
    <div className="workspace">
      <div className="workspace__title">
        <AppstoreOutlined
          style={{ fontSize: "200%", paddingTop: "28px", marginRight: "10px" }}
        />
        <h1>Không gian của bạn</h1>
        <div className="toolbar">
          <button className="btn-create" onClick={() => setIsOpen(true)}>
            Tạo không gian mới
          </button>
        </div>
      </div>

      <FormModal
        open={isOpen}
        cInfo={cardInfo}
        setCardInfo={() => setCardInfo(cardInfo)}
        onClose={() => setIsOpen(false)}
        onModalSubmit={handleSubmitForm}
      />

      <div className="browser">
        <div className="bar">
          {cardInfo.map((card, index) => (
            <Card
              key={index}
              name={card.workspace_name}
              description={card.description}
              onPageChange={() => handlePageChange(card._id)}
            />
          ))}
          {/* <Card name={cardInfo[0].name} description={cardInfo[0].description} /> */}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
