import React, { useEffect, useState } from "react";
import { Button, Checkbox, Modal, Progress } from "antd";
import "antd/dist/antd.css";
import {
  StarFilled,
  StarOutlined,
  UserOutlined,
  PlusOutlined,
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

  useEffect(() => {
    apiClient.get(`/table/ws/${workspaceId}`).then((response) => {
      const { data } = response.data;
      setTableItems(data);
    });
  }, [newTable]);

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
                />
              );
            }
          })}
        </div>
      </div>
      <div className="Table">
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
