import { PlusCircleFilled } from "@ant-design/icons";
import { Dropdown, Menu, Tooltip } from "antd";

const Card = ({ name, description, arrUser, onPageChange }) => {
  const colorPallete = [
    "bg-red-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-indigo-400",
    "bg-purple-400",
    "bg-pink-400",
  ];

  return (
    <div className="card">
      <div className="card__info" onClick={onPageChange}>
        <div
          className={
            colorPallete[Math.floor(Math.random() * colorPallete.length)] +
            " select-none h-14 rounded-t-xl"
          }
        ></div>
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
        <PlusCircleFilled
          style={{
            fontSize: "200%",
            color: "rgb(181, 181, 181)",
            paddingTop: "1px",
          }}
        />
      </div>
    </div>
  );
};

export default Card;
