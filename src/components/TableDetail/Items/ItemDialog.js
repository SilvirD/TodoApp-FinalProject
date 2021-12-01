import {
  AlignLeftOutlined,
  CheckOutlined,
  CheckSquareOutlined,
  FieldTimeOutlined,
  PlusCircleFilled,
  UnorderedListOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Menu,
  Modal,
  Progress,
  Tooltip,
} from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { apiClient } from "../../../helper/api_client";
import "./ItemDialog.scss";

export default function ItemDialog({
  isDialogOpen,
  onOpenCloseDialog,
  dialogContent,
}) {

  const { _id, card_name, card_desc, users_in_card, userInTable } =
    dialogContent || {
      _id: "",
      card_name: "",
      card_desc: "",
      users_in_card: [],
      userInTable: [],
    };

  const [taskList, setTaskList] = useState([]);
  const [subTasks, setSubTasks] = useState([]);
  const [deadLine, setDeadline] = useState("");
  const [newData, setNewData] = useState();
  const [menuVisible, setMenuVisible] = useState(false);

  // useEffect(() => {
  //   apiClient
  //     .get(`/card/${_id}`)
  //     .then((response) => );
  // }, [newData]);

  // useEffect(() => {
  //   if (itemKey) {
  //     apiClient.get(`/taskList/${itemKey}`).then((response) => {
  //       const { data } = response.data;
  //       setTaskList(data);
  //     });
  //   }
  // }, [newData]);

  // useEffect(() => {
  //   if (itemKey) {
  //     apiClient.patch(`card/editCard/${itemKey}`, {
  //       card_deadline: {
  //         deadline: deadLine,
  //       },
  //     });
  //   }
  // }, [deadLine]);

  const percent = useMemo(() => {
    const checkedTask = subTasks.reduce(
      (calc, curr) => (curr.checked ? calc + 1 : calc),
      0
    );
    return Math.floor((checkedTask / subTasks.length) * 100);
  }, [subTasks]);

  const handleDeleteWork = (id) => {
    // setSubTasks((prevWorks) => prevWorks.filter((item) => item.id !== id));
    // call api delete
  };

  const handleDateChange = (date, dateString) => {
    setDeadline(moment.utc(dateString));
  };

  const handleVisibleChange = () => {
    setMenuVisible(!menuVisible);
  };

  const memberIDs = users_in_card.map((member) => member.user_ID);
  const handleMenuClick = (e) => {
    if (memberIDs.includes(e.key)) {
      apiClient
        .patch(`/card/deleteUserCard/${_id}`, {
          user_ID: e.key,
        })
        .then((response) => setNewData(response));
    } else {
      apiClient
        .patch(`/card/addUserCard/${_id}`, {
          user_ID: e.key,
        })
        .then((response) => setNewData(response));
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {userInTable.map((userTb) => {
        const { _id, email } = userTb.user_ID;
        return (
          <Menu.Item key={_id}>
            <div>
              {email}
              {users_in_card
                .map((member) => member.user_ID._id)
                .includes(_id) && <CheckOutlined style={{ color: "green" }} />}
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Modal
      visible={isDialogOpen}
      title={card_name}
      onOk={onOpenCloseDialog}
      onCancel={onOpenCloseDialog}
      width={850}
      footer={[
        <Button key="back" onClick={onOpenCloseDialog}>
          Return
        </Button>,
        <Button key="submit" type="primary" onClick={onOpenCloseDialog}>
          Submit
        </Button>,
      ]}
      style={{ top: 20 }}
    >
      <div className="Content">
        <div className="Content__main">
          <div className="Content__main__members">
            <div className="Content__main__members__title">
              <span>Member</span>
            </div>
            <div className="Content__main__members__list">
              {users_in_card.map((member) => {
                return (
                  <Tooltip placement="bottom" title={member.user_ID.username}>
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
                      paddingTop: "2px",
                    }}
                  />
                </div>
              </Dropdown>
            </div>
          </div>

          {/* <div className="Content__main__deadline">
            <div>Deadline: {deadLine}</div>
          </div> */}

          <div className="Content__main__desc">
            <div className="Content__main__desc__title">
              <AlignLeftOutlined style={{ fontSize: "150%" }} />
              <span id="title">Desc</span>
              <span id="btnEdit">Edit</span>
            </div>
            <div className="Content__main__desc__detail">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                voluptatibus animi aut dolore enim, magni beatae! Odit, minus
                atque magnam, repellat a dolorum blanditiis fugiat unde quod
                aperiam facilis vel.
              </p>
            </div>
          </div>

          <div className="Content__main__work">
            {taskList.map((task) => {
              const { subTask_IDs } = task;
              return (
                <>
                  <div className="Content__main__work__title">
                    <CheckSquareOutlined style={{ fontSize: "150%" }} />
                    <span>Works</span>
                    <span id="btnDelete">Delete</span>
                  </div>
                  <div className="Content__main__work__detail">
                    <Progress percent={percent} />
                    {subTask_IDs.map((work, index) => {
                      return (
                        <div className="Content__main__work__detail__item">
                          <div className="Content__main__work__detail__item__checkbox">
                            <Checkbox
                              checked={work.checked}
                              onChange={(e) => {
                                work.checked = !work.checked;
                                setSubTasks([...subTask_IDs]);
                              }}
                            />
                          </div>
                          <div className="Content__main__work__detail__item__text">
                            <p>{work.content}</p>
                          </div>
                          <Button
                            type="button"
                            onClick={() => handleDeleteWork(work.id)}
                          >
                            X
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>

          <div className="Content__main__actions">
            <div className="Content__main__actions__title">
              <UnorderedListOutlined style={{ fontSize: "150%" }} />
              <span>Actions</span>
              <span id="btnHide">Hide</span>
            </div>
            <div className="Content__main__actions__detail">
              <div className="Content__main__actions__detail__content">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcKj1fruVtsXkI7teuyk4KqBoKr9SVaEA7IA&usqp=CAU"
                  alt=""
                />
                <div className="Content__main__actions__detail__content__time">
                  <p>hihihi</p>
                  <span>15-11-2021 17:00</span>
                </div>
              </div>
              <div className="Content__main__actions__detail__content">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcKj1fruVtsXkI7teuyk4KqBoKr9SVaEA7IA&usqp=CAU"
                  alt=""
                />
                <div className="Content__main__actions__detail__content__time">
                  <p>hihihi</p>
                  <span>15-11-2021 17:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Content__sidebar">
          <span>Add to card</span>
          <div className="Content__sidebar__button">
            <div className="Content__sidebar__button__item">
              <UserAddOutlined style={{ fontSize: "120%" }} />
              <span>Add new member</span>
            </div>
            <div className="Content__sidebar__button__item">
              <CheckSquareOutlined style={{ fontSize: "120%" }} />
              <span>Add new work</span>
            </div>
            <div className="Content__sidebar__button__item">
              <FieldTimeOutlined style={{ fontSize: "120%" }} />
              <DatePicker value={deadLine} onChange={handleDateChange} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
