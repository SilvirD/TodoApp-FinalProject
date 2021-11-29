import { useState } from "react";
import ReactDom from "react-dom";
import { apiClient } from "../../helper/api_client";
import "../../styles/FormModal.scss";

export default function FormModal({
  open,
  cInfo,
  setCardInfo,
  onClose,
  onModalSubmit,
}) {
  const [cardName, setCardName] = useState("");
  const [cardDesc, setCardDesc] = useState("");

  if (!open) {
    return null;
  }

  const createNewCard = async (e, cInfo) => {
    e.preventDefault();

    let newCard = {
      name: cardName,
      desc: cardDesc,
      userToken: localStorage.getItem("tokenLogin"),
    };

    console.log(newCard);

    await apiClient
      .post("/workspace/addWorkspace", newCard)
      .then((response) => {
        alert("add WS successfully");
      })
      .catch((error) => {
        alert("error send data", error);
      });

    onModalSubmit();

    onClose(!open);
  };

  return ReactDom.createPortal(
    <>
      <div className="overlay">
        <div className="form-modal">
          <h1>Tạo không gian làm việc mới</h1>
          <hr />
          <form onSubmit={(e) => createNewCard(e, cInfo)}>
            <label htmlFor="name">Tên không gian</label>
            <input
              type="text"
              id="name"
              name="name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            <label htmlFor="desc">Mô tả</label>
            <textarea
              type="text"
              id="desc"
              name="desc"
              value={cardDesc}
              onChange={(e) => setCardDesc(e.target.value)}
            ></textarea>
            <input type="submit" id="submit" value="Tạo" />
            <button onClick={onClose}>Đóng</button>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
