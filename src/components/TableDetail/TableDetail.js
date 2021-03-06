import {
  CheckOutlined,
  EllipsisOutlined,
  StarFilled,
  StarOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Menu, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiClient } from "../../helper/api_client";
import Column from "./Column/Column";
import "./TableDetail.scss";

export default function Table() {
  const [columns, setColumns] = useState([]);
  const [tableDetail, setTableDetail] = useState({
    users_in_table: [],
    _id: "",
    star: false,
  });
  const [tableName, setTableName] = useState("");
  const [userInWS, setUserInWS] = useState([]);
  const [userInTable, setUserInTable] = useState([]);
  const [newData, setNewData] = useState();
  const [menuVisible, setMenuVisible] = useState(false);

  const [colName, setColName] = useState("");

  const [isColDialogOpen, setIsColDialogOpen] = useState(false);

  const params = useParams();
  const tableId = params.id;
  const { _id, star, users_in_table } = tableDetail;

  const handleReloadCard = () => {
    apiClient.get(`/column/${tableId}`).then((response) => {
      const { data } = response.data;
      setColumns(data);
    });
  };

  useEffect(() => {
    apiClient.get(`/table/${tableId}`).then((response) => {
      const { data } = response.data;
      setTableDetail(data[0]);
    });
  }, [newData]);

  useEffect(() => {
    apiClient.get(`/column/${tableId}`).then((response) => {
      const { data } = response.data;
      setColumns(data);
    });
  }, []);

  useEffect(() => {
    const { table_name } = tableDetail;
    setTableName(table_name);
    setUserInTable(users_in_table);
  }, [tableDetail]);

  useEffect(() => {
    const { workspace_ID } = tableDetail;
    if (workspace_ID) {
      apiClient.get(`/workspace/${workspace_ID}`).then((response) => {
        const { users_in_ws } = response.data;
        setUserInWS(users_in_ws);
      });
    }
  }, [tableDetail]);

  const handleChangeInput = (e) => {
    setTableName(e.target.value);
  };

  const handleColNameChange = (e) => {
    setColName(e.target.value);
  };

  const handleOpenColDialog = () => {
    setIsColDialogOpen(!isColDialogOpen);
  };

  const handleSubmitTableName = (e) => {
    apiClient
      .patch(`/table/editTable/${tableId}`, {
        table_name: tableName,
      })
      .then((response) => {
        setNewData(response.data);
      });
  };

  const handleMarkedTable = (tableId, currStar) => {
    apiClient
      .patch(`/table/editTable/${tableId}`, {
        star: !currStar,
      })
      .then((response) => {
        setNewData(response.data);
      });
  };

  const handleVisibleChange = () => {
    setMenuVisible(!menuVisible);
  };

  const userTableIDs = userInTable.map((userTb) => userTb.user_ID._id);
  const handleMenuClick = (e) => {
    if (userTableIDs.includes(e.key)) {
      apiClient
        .patch(`/table/deleteUserTable/${tableId}`, {
          user_ID: e.key,
        })
        .then((response) => setNewData(response));
    } else {
      apiClient
        .patch(`/table/addUserTable/${tableId}`, {
          user_ID: e.key,
        })
        .then((response) => setNewData(response));
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {userInWS.map((userWs) => {
        const { _id, email } = userWs.user_ID;
        return (
          <Menu.Item key={_id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {email}
              {userInTable
                .map((userTb) => userTb.user_ID._id)
                .includes(_id) && <CheckOutlined style={{ color: "green" }} />}
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const handleCreateCol = () => {
    if (colName) {
      apiClient
        .post("/column/addColumn", {
          table_ID: tableId,
          name: colName,
        })
        .then((response) => {
          handleReloadCard();
          handleOpenColDialog();
        });

      setColName("");
    }
  };

  return (
    <>
      <div className="Table__Menu">
        <input
          type="text"
          value={tableName}
          onChange={(e) => handleChangeInput(e)}
          onBlur={handleSubmitTableName}
        />
        <div onClick={() => handleMarkedTable(_id, star)}>
          {star ? (
            <StarFilled style={{ color: "rgb(255,179,80)" }} />
          ) : (
            <StarOutlined />
          )}
        </div>
        <div className="Table__Menu__User">
          {userInTable.map((user) => {
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
        <div className="Table__Menu__Invite">
          <Dropdown
            overlay={menu}
            onVisibleChange={handleVisibleChange}
            visible={menuVisible}
          >
            <div
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <UserAddOutlined />
            </div>
          </Dropdown>
        </div>
        <div className="Table__Menu__More">
          <EllipsisOutlined />
        </div>
      </div>

      <div
        className="Table__Item"
        style={{ display: "flex", margin: "10px", overflowX: "auto" }}
      >
        {columns.map((column, index) => {
          const { _id, column_name, card_IDs } = column;
          return (
            <Column
              key={_id}
              colIndex={index}
              colId={_id}
              colName={column_name}
              cardItems={card_IDs}
              userInTable={userInTable}
              onReloadCard={handleReloadCard}
            />
          );
        })}
        <div className="Table__Item__Add" onClick={handleOpenColDialog}>
          Th??m c???t m???i
        </div>
      </div>

      <Modal
        visible={isColDialogOpen}
        title="Th??m c???t m???i"
        onCancel={handleOpenColDialog}
        width={300}
        footer={[
          <Button key="submit" type="primary" onClick={handleCreateCol}>
            Submit
          </Button>,
        ]}
        style={{ top: 100 }}
      >
        <div className="workModal">
          <div className="workModal__name">
            T??n c???t:
            <Input value={colName} onChange={(e) => handleColNameChange(e)} />
          </div>
        </div>
      </Modal>
    </>
  );
}
