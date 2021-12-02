import {
  PlusCircleFilled,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Tooltip } from "antd";
import { apiClient } from "../../helper/api_client";
import { useEffect, useState, useCallback, memo } from "react";

const Card = ({
  name,
  description,
  arrUser,
  workspaceID,
  onFetchWorkspace,
  onPageChange,
}) => {
  const colorPallete = [
    "bg-red-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-indigo-400",
    "bg-purple-400",
    "bg-pink-400",
  ];

  const [userList, setUserList] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [randColor, setRandColor] = useState("");

  const handleVisibleChange = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    setRandColor(colorPallete[Math.floor(Math.random() * colorPallete.length)]);
  }, []);

  useEffect(() => {
    apiClient.get(`/user`).then((response) => {
      setUserList(response.data);
    });
  }, []);

  const arrUserID = arrUser.map((user) => user.user_ID._id);
  const handleMenuClick = (e) => {
    if (arrUserID.includes(e.key)) {
      apiClient
        .patch(`/workspace/deleteUserWS/${workspaceID}`, {
          user_ID: e.key,
        })
        .then((response) => onFetchWorkspace());
    } else {
      apiClient
        .patch(`/workspace/addUserWS/${workspaceID}`, {
          user_ID: e.key,
        })
        .then((response) => onFetchWorkspace());
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {userList.map((user) => {
        const { _id, email } = user;
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
              {arrUser.map((arrUser) => arrUser.user_ID._id).includes(_id) && (
                <CheckOutlined style={{ color: "green" }} />
              )}
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const handleDeleteWS = (workspaceID) => {
    apiClient
      .delete(`/workspace/delete/${workspaceID}`)
      .then((response) => onFetchWorkspace());
  };

  return (
    <>
      <div className="bar__info">
        <div className="card">
          <div className="card__info" onClick={onPageChange}>
            <div className={`${randColor} select-none h-14 rounded-t-xl`}></div>
            <div className="card__info__title m-4">
              <h1>{name}</h1>
            </div>
          </div>
          <div className="card__users">
            {arrUser.map((user) => {
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
            <Dropdown
              overlay={menu}
              onVisibleChange={handleVisibleChange}
              visible={menuVisible}
            >
              <div
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <PlusCircleFilled
                  style={{
                    fontSize: "200%",
                    color: "rgb(181, 181, 181)",
                    paddingTop: "1px",
                  }}
                />
              </div>
            </Dropdown>
          </div>
        </div>
        <div className="delete">
          <DeleteOutlined
            style={{
              fontSize: "150%",
            }}
            onClick={() => handleDeleteWS(workspaceID)}
          />
        </div>
      </div>
    </>
  );
};
export default Card;
