import { Button } from "antd";
import { Input } from "antd";

import { useState } from "react";
import { apiClient } from "../../../helper/api_client";

function AddInput({ taskListID, onReloadDialog }) {
  const [showInput, setShowInput] = useState(false);
  const [subTaskName, setSubTaskName] = useState("");

  const handleShowInput = () => {
    setShowInput(!showInput);
  };

  const handleSubTaskChange = (e) => {
    setSubTaskName(e.target.value);
  };

  const handleCancelSubTask = () => {
    setShowInput();
    setSubTaskName("");
  };

  const handleSubmitSubTask = () => {
    if (subTaskName) {
      apiClient
        .post("subtask/addSubTask", {
          taskList_ID: taskListID,
          content: subTaskName,
          subtask_checked: false,
        })
        .then((response) => onReloadDialog());

      handleCancelSubTask();
    }
  };

  return (
    <div>
      {!showInput && <Button onClick={handleShowInput}>Thêm 1 mục</Button>}

      {showInput && (
        <div>
          <Input
            value={subTaskName}
            onChange={(e) => handleSubTaskChange(e)}
            placeholder="Thêm 1 việc phụ"
          />
          <Button onClick={handleSubmitSubTask}>Thêm</Button>
          <Button onClick={handleCancelSubTask}>Huỷ</Button>
        </div>
      )}
    </div>
  );
}

export default AddInput;
