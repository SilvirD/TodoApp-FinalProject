import { Modal, Button, Input } from "antd";
import { useState } from "react";
import { apiClient } from "../../../helper/api_client";

function AddWorkModal({ cardID, isOpenWorkModal, onCloseWorkModal }) {
  const [workName, setWorkName] = useState("");

  const handleWorkNameChange = (e) => {
    setWorkName(e.target.value);
  };

  const handleSubmitWork = () => {
    if (workName) {
      apiClient
        .post("/taskList/addTaskList", {
          card_ID: cardID,
          taskList_name: workName,
        })
        .then((response) => {
          onCloseWorkModal();
        });

      setWorkName("");
    }
  };

  return (
    <Modal
      visible={isOpenWorkModal}
      title="Add new work"
      onOk={onCloseWorkModal}
      onCancel={onCloseWorkModal}
      width={300}
      footer={[
        <Button key="submit" type="primary" onClick={handleSubmitWork}>
          Submit
        </Button>,
      ]}
      style={{ top: 100 }}
    >
      <div className="workModal">
        <div className="workModal__name">
          Task name:
          <Input value={workName} onChange={(e) => handleWorkNameChange(e)} />
        </div>
      </div>
    </Modal>
  );
}

export default AddWorkModal;
