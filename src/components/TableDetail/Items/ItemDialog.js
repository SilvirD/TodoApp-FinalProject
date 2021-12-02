import {
  AlignLeftOutlined,
  CheckOutlined,
  CheckSquareOutlined,
  FieldTimeOutlined,
  PlusCircleFilled,
  UnorderedListOutlined,
  UserAddOutlined,
  CloseOutlined,
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
import AddWorkModal from "./AddWorkModal";
import AddInput from "./AddInput";
import ProgressBar from "./ProgressBar";

const defaultData = {
  _id: "",
  card_name: "",
  card_desc: "",
  users_in_card: [],
  userInTable: [],
  card_deadline: {
    created_at: "TBD",
    deadline: "TBD",
  },
  card_taskLists: [],
};

export default function ItemDialog({
  isDialogOpen,
  onOpenCloseDialog,
  dialogContent,
  onReloadDialog,
}) {
  const {
    _id,
    card_name,
    card_desc,
    users_in_card,
    userInTable,
    card_deadline,
    card_taskLists,
  } = dialogContent || defaultData;

  const [subTasks, setSubTasks] = useState([]);
  const [deadLine, setDeadline] = useState();
  const [newData, setNewData] = useState();
  const [dialogDesc, setDialogDesc] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  const [isOpenWorkModal, setIsOpenWorkModal] = useState(false);

  useEffect(() => {
    if (_id && deadLine) {
      apiClient
        .patch(`card/editCard/${_id}`, {
          card_deadline: {
            deadline: deadLine,
          },
        })
        .then((response) => {
          onReloadDialog(_id, userInTable);
        });
    }
  }, [deadLine]);

  useEffect(() => {
    setDialogDesc(card_desc);
  }, [card_desc]);

  const percent = useMemo(() => {
    const checkedTask = subTasks.reduce(
      (calc, curr) => (curr.checked ? calc + 1 : calc),
      0
    );
    return Math.floor((checkedTask / subTasks.length) * 100);
  }, [subTasks]);

  const handleDeleteWork = (workID, cardID) => {
    apiClient
      .delete(`taskList/deleteTaskList/${workID}`, {
        cardID,
      })
      .then((response) => onReloadDialog(_id, userInTable));
  };

  const handleDateChange = (date, dateString) => {
    const dateFormat = moment(dateString);
    console.log(moment(dateString).toISOString());
    setDeadline(dateFormat);
  };

  const handleVisibleChange = () => {
    setMenuVisible(!menuVisible);
  };

  const handleChangeInput = (e) => {
    setDialogDesc(e.target.value);
  };

  const handleSubmitCardDesc = (e) => {
    apiClient
      .patch(`/card/editCard/${_id}`, {
        card_desc: dialogDesc,
      })
      .then((response) => {
        onReloadDialog(_id, userInTable);
      });
  };

  const memberIDs = users_in_card.map((member) => member.user_ID._id);
  const handleMenuClick = (e) => {
    if (memberIDs.includes(e.key)) {
      apiClient
        .patch(`/card/deleteUserCard/${_id}`, {
          user_ID: e.key,
        })
        .then((response) => onReloadDialog(_id, userInTable));
    } else {
      apiClient
        .patch(`/card/addUserCard/${_id}`, {
          user_ID: e.key,
        })
        .then((response) => onReloadDialog(_id, userInTable));
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {userInTable.map((userTb) => {
        const { _id, email } = userTb.user_ID;
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
              {users_in_card
                .map((member) => member.user_ID._id)
                .includes(_id) && <CheckOutlined style={{ color: "green" }} />}
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const handleCloseDialog = () => {
    setDeadline();
    onOpenCloseDialog();
  };

  const handleAddNewWork = () => {
    setIsOpenWorkModal(!isOpenWorkModal);
  };

  const handleCloseWorkModal = () => {
    setIsOpenWorkModal();
    onReloadDialog(_id, userInTable);
  };

  const handleDeleteSubTask = (subTaskID, taskListID) => {
    apiClient
      .delete(`subtask/deleteSubTask/${subTaskID}`, {
        taskListID,
      })
      .then((response) => onReloadDialog(_id, userInTable));
  };

  const handleSubTaskChecked = (subTaskID, currentCheck) => {
    apiClient
      .patch(`/subtask/editSubTask/${subTaskID}`, {
        subtask_checked: !currentCheck,
      })
      .then((response) => onReloadDialog(_id, userInTable));
  };

  return (
    <Modal
      visible={isDialogOpen}
      title={card_name}
      onOk={handleCloseDialog}
      onCancel={handleCloseDialog}
      width={850}
      footer={null}
      style={{ top: 20 }}
    >
      <div className="Content">
        <div className="Content__main">
          <div className="Content__main__members">
            <div className="Content__main__members__title">
              <span>Thành viên</span>
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

          <div className="Content__main__desc">
            <div className="Content__main__desc__title">
              <AlignLeftOutlined style={{ fontSize: "150%" }} />
              <span id="title">Mô tả</span>
            </div>
            <div className="Content__main__desc__detail">
              <input
                type="text"
                value={dialogDesc}
                onChange={(e) => handleChangeInput(e)}
                onBlur={handleSubmitCardDesc}
              />
            </div>
          </div>

          <div className="Content__main__desc__deadline">
            <div className="Content__main__desc__deadline__create">
              <h3>Ngày tạo:</h3>
              {moment(card_deadline.created_at).format("DD/MM/YYYY")}
            </div>

            <div className="Content__main__desc__deadline__finish">
              <h3>Hạn chót:</h3>
              {moment(card_deadline.deadline).format("DD/MM/YYYY")}
            </div>
          </div>

          <div className="Content__main__work">
            {card_taskLists.map((task) => {
              const { taskList_ID } = task;
              console.log("0000", taskList_ID);
              const { subTask_IDs } = taskList_ID;
              return (
                <>
                  <div className="Content__main__work__title">
                    <CheckSquareOutlined style={{ fontSize: "150%" }} />
                    <span>{taskList_ID.taskList_name}</span>
                    <span
                      id="btnDelete"
                      onClick={() =>
                        handleDeleteWork(taskList_ID._id, taskList_ID.card_ID)
                      }
                    >
                      Xóa
                    </span>
                  </div>
                  <div className="Content__main__work__detail">
                    <ProgressBar itemArr={subTask_IDs} />

                    {subTask_IDs.map((subTask) => {
                      const { subTask_ID } = subTask;
                      console.log("-----subTask_ID", subTask_ID);
                      return (
                        <div className="Content__main__work__detail__item">
                          <div className="Content__main__work__detail__item__checkbox">
                            <Checkbox
                              checked={subTask_ID.subtask_checked}
                              onClick={() =>
                                handleSubTaskChecked(
                                  subTask_ID._id,
                                  subTask_ID.subtask_checked
                                )
                              }
                            />
                          </div>
                          <div className="Content__main__work__detail__item__text">
                            <p>{subTask_ID.subtask_info.content}</p>
                          </div>
                          <div
                            className="Content__main__work__detail__item__remove"
                            onClick={() =>
                              handleDeleteSubTask(
                                subTask_ID._id,
                                subTask_ID.taskList_ID
                              )
                            }
                          >
                            <CloseOutlined />
                          </div>
                        </div>
                      );
                    })}

                    <AddInput
                      taskListID={taskList_ID._id}
                      onReloadDialog={() => onReloadDialog(_id, userInTable)}
                    />

                    {/* {subTask_IDs.map((work, index) => {
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
                    })} */}
                  </div>
                </>
              );
            })}
          </div>

          <div className="Content__main__actions">
            <div className="Content__main__actions__title">
              <UnorderedListOutlined style={{ fontSize: "150%" }} />
              <span>Hoạt động</span>
              <span id="btnHide">Ẩn</span>
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
          <span>Thêm vào thẻ</span>
          <div className="Content__sidebar__button">
            <div className="Content__sidebar__button__item">
              <UserAddOutlined style={{ fontSize: "120%" }} />
              <span>Thêm thành viên</span>
            </div>
            <div
              className="Content__sidebar__button__item"
              onClick={handleAddNewWork}
            >
              <CheckSquareOutlined style={{ fontSize: "120%" }} />
              <span>Thêm công việc</span>
            </div>
            <div className="Content__sidebar__button__item">
              <FieldTimeOutlined style={{ fontSize: "120%" }} />
              <span>Thêm deadline</span>
              <DatePicker value={deadLine} onChange={handleDateChange} />
            </div>
          </div>
        </div>
      </div>

      <AddWorkModal
        cardID={_id}
        isOpenWorkModal={isOpenWorkModal}
        onCloseWorkModal={handleCloseWorkModal}
      />
    </Modal>
  );
}
