import React, { useEffect, useState } from "react";
import { Button, Checkbox, Modal, Progress } from "antd";
import { Dropdown, Menu, Tooltip } from "antd";
import "antd/dist/antd.css";
import {
  StarFilled,
  StarOutlined,
  UserOutlined,
  PlusOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "./Table.scss";
import { apiClient } from "../../helper/api_client";

import TableItem from "./TableItem";
import { useHistory, useParams } from "react-router";

function Table() {
  const history = useHistory();
  const params = useParams();
  const workspaceId = params.id;
  const [tableItems, setTableItems] = useState([]);

  const [newTable, setNewTable] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [tableTitle, setTableTitle] = useState("");
  const [wsInfo, setWsInfo] = useState({
    workspace_name: "",
    users_in_ws: [],
  });

  const reloadTables = () => {
    apiClient.get(`/table/ws/${workspaceId}`).then((response) => {
      const { data } = response.data;
      setTableItems(data);
    });
  };

  useEffect(() => {
    reloadTables();
  }, [newTable]);

  useEffect(() => {
    apiClient.get(`/workspace/${workspaceId}`).then((response) => {
      setWsInfo(response.data);
    });
  }, []);

  const handleChangeInput = (e) => {
    setWsInfo({
      workspace_name: e.target.value,
    });
    console.log(e);
  };

  const handleSubmitWorkspaceName = (e) => {
    apiClient.patch(`/workspace/editWorkspace/${workspaceId}`, {
      workspace_name: wsInfo.workspace_name,
    });
  };

  const handleMarkedTable = (tableId, currStar) => {
    apiClient
      .patch(`/table/editTable/${tableId}`, {
        star: !currStar,
      })
      .then((response) => {
        setNewTable(response.data);
      });
  };

  const handleOpenDialog = () => {
    setOpenModal(!openModal);
  };

  const handleCloseDialog = () => {
    setOpenModal();
    setTableTitle("");
  };

  const handleCreateTable = () => {
    apiClient
      .post(`table/addTable`, {
        workspace_ID: workspaceId,
        name: tableTitle,
        star: false,
      })
      .then((response) => setNewTable(response.data));

    handleCloseDialog();
  };

  const handlePageChange = (id) => {
    history.push(`/notification/${id}`);
  };

  return (
    <>
      <div className="Table__Workspace">
        <input
          className="Table__Workspace__Input"
          type="text"
          value={wsInfo.workspace_name.toLocaleUpperCase()}
          onChange={(e) => handleChangeInput(e)}
          onBlur={handleSubmitWorkspaceName}
        />
      </div>
      <div className="Table">
        <div className="Table__Title">
          <TeamOutlined style={{ fontSize: "150%" }} />
          <span> Thành viên</span>
        </div>
        <div className="Table__UserList">
          {wsInfo.users_in_ws.map((user) => {
            const { username } = user.user_ID;
            return (
              <Tooltip placement="bottom" title={username}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcKj1fruVtsXkI7teuyk4KqBoKr9SVaEA7IA&usqp=CAU"
                  alt=""
                />
              </Tooltip>
            );
          })}
        </div>
      </div>
      <div className="Table">
        <div className="Table__Title">
          <StarOutlined style={{ fontSize: "150%" }} />
          <span> Bảng gắn sao</span>
        </div>
        <div className="Table__Content">
          {tableItems.map((item) => {
            const { _id, star, table_name, users_in_table } = item;
            if (star) {
              return (
                <TableItem
                  key={_id}
                  tableId={_id}
                  tableName={table_name}
                  isTableChecked={star}
                  members={users_in_table}
                  onMarkedTable={() => handleMarkedTable(_id, star)}
                  onPageChange={() => handlePageChange(_id)}
                  onReloadTable={reloadTables}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="Table" style={{ paddingBottom: "16px" }}>
        <div className="Table__Title">
          <UserOutlined style={{ fontSize: "150%" }} />
          <span> Bảng cá nhân</span>
        </div>
        <div className="Table__Content">
          {tableItems.map((item) => {
            const { _id, star, table_name, users_in_table } = item;
            return (
              <TableItem
                key={_id}
                tableId={_id}
                tableName={table_name}
                isTableChecked={star}
                members={users_in_table}
                onMarkedTable={() => handleMarkedTable(_id, star)}
                onPageChange={() => handlePageChange(_id)}
                onReloadTable={reloadTables}
              />
            );
          })}
          <div className="Table__Content__Item__Non" onClick={handleOpenDialog}>
            <p>
              <span>Tạo bảng mới </span>
              <PlusOutlined />
            </p>
          </div>
        </div>
      </div>

      <Modal
        visible={openModal}
        title="Tạo bảng mới"
        width={300}
        onCancel={handleCloseDialog}
        footer={[
          <Button key="back" onClick={handleCloseDialog}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleCreateTable}>
            Tạo mới
          </Button>,
        ]}
      >
        <div className="InputTable">
          <h4>Tên bảng:</h4>
          <input
            type="text"
            value={tableTitle}
            onChange={(e) => setTableTitle(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
}

export default Table;
