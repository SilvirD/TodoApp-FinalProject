import {
  CheckOutlined,
  EllipsisOutlined,
  StarFilled,
  StarOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Tooltip } from "antd";
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
  const [isTicked, setIsTicked] = useState(false);

  const params = useParams();
  const tableId = params.id;
  const { _id, star, users_in_table } = tableDetail;

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

  const handleMenuClick = (e) => {
    console.log(e);
  };

  const handleVisibleChange = () => {
    setMenuVisible(!menuVisible);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {userInWS.map((user) => {
        const { _id, email } = user.user_ID;
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
              {userInTable.map((item) => item.user_ID._id).includes(_id) && (
                <CheckOutlined style={{ color: "green" }} />
              )}
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );

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
            />
          );
        })}
      </div>
    </>
  );
}
