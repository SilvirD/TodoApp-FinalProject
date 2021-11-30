import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiClient } from "../../helper/api_client";
import Column from "./Column/Column";
import "./TableDetail.scss";
import {
  StarFilled,
  StarOutlined,
  UserAddOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

export default function Table() {
  const [columns, setColumns] = useState([]);

  const params = useParams();
  const tableId = params.id;

  useEffect(() => {
    apiClient.get(`/column/${tableId}`).then((response) => {
      const { data } = response.data;
      setColumns(data);
    });
  }, []);

  return (
    <>
      <div className="Table__Menu">
        <input type="text" value="hihihisssssssssssssssssssssssssssssss" />
        <StarOutlined />
        <div className="Table__Menu__User">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcKj1fruVtsXkI7teuyk4KqBoKr9SVaEA7IA&usqp=CAU"
            alt=""
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcKj1fruVtsXkI7teuyk4KqBoKr9SVaEA7IA&usqp=CAU"
            alt=""
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcKj1fruVtsXkI7teuyk4KqBoKr9SVaEA7IA&usqp=CAU"
            alt=""
          />
        </div>
        <div className="Table__Menu__Invite">
          <UserAddOutlined />
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
