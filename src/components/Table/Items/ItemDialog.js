import {
  AlignLeftOutlined,
  CheckSquareOutlined,
  FieldTimeOutlined,
  PlusCircleFilled,
  UnorderedListOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Modal, Progress } from "antd";
import "antd/dist/antd.css";
import { useMemo, useState } from "react";
import "./ItemDialog.scss";
import { workList } from "./Mockdata";

export default function ItemDialog({
  isDialogOpen,
  onOpenCloseDialog,
  ...remains
}) {
  const { title, content, longContent, members = [] } = remains;

  const [works, setWorks] = useState(workList);

  const percent = useMemo(() => {
    const checkedTask = works.reduce(
      (calc, curr) => (curr.checked ? calc + 1 : calc),
      0
    );
    return Math.floor((checkedTask / works.length) * 100);
  }, [works]);

  const handleDeleteWork = (id) => {
    setWorks((prevWorks) => prevWorks.filter((item) => item.id !== id));
  };

  return (
    <Modal
      visible={isDialogOpen}
      title={title}
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
              {members.map((member) => {
                return (
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcKj1fruVtsXkI7teuyk4KqBoKr9SVaEA7IA&usqp=CAU"
                    alt=""
                  />
                );
              })}
              <PlusCircleFilled
                style={{ fontSize: "200%", color: "rgb(181, 181, 181)" }}
              />
            </div>
          </div>

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
            <div className="Content__main__work__title">
              <CheckSquareOutlined style={{ fontSize: "150%" }} />
              <span>Works</span>
              <span id="btnDelete">Delete</span>
            </div>
            <div className="Content__main__work__detail">
              <Progress percent={percent} />
              {works.map((work, index) => {
                return (
                  <div className="Content__main__work__detail__item">
                    <div className="Content__main__work__detail__item__checkbox">
                      <Checkbox
                        checked={work.checked}
                        onChange={(e) => {
                          work.checked = !work.checked;
                          setWorks([...works]);
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
              <span>Add deadline</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
