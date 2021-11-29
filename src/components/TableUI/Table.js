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

function Table() {
  const [tableItems, setTableItems] = useState([]);

  useEffect(() => {
    apiClient.get(`/table/618b9333a179ba01fc49768c`).then((response) => {
      const { data } = response.data;
      setTableItems(data);
    });
  }, []);

  console.log(tableItems);

  return (
    <>
      <div className="Table">
        <div className="Table__Title">
          <StarOutlined style={{ fontSize: "150%" }} />
          <span> Bảng gắn sao</span>
        </div>
        <div className="Table__Content">
          <div className="Table__Content__Item__Star">
            <h1>table star</h1>
            <StarFilled />
          </div>
        </div>
      </div>
      <div className="Table">
        <div className="Table__Title">
          <UserOutlined style={{ fontSize: "150%" }} />
          <span> Bảng cá nhân</span>
        </div>
        <div className="Table__Content">
          {/* <div className="Table__Content__Item">
            <h1>table test 1</h1>
            <StarOutlined />
          </div>
          <div className="Table__Content__Item">
            <h1>table test 2</h1>
            <StarOutlined />
          </div>
          <div className="Table__Content__Item">
            <h1>table test 3</h1>
            <StarOutlined />
          </div>
          <div className="Table__Content__Item">
            <h1>table test 4</h1>
            <StarOutlined />
          </div>
          <div className="Table__Content__Item">
            <h1>table test 5 sdahgf agsdya asydgagstd ashuduas</h1>
            <StarOutlined />
          </div>
          <div className="Table__Content__Item">
            <h1>table test 6has d hasid hasdausdhas sada</h1>
            <StarOutlined />
          </div> */}

          {tableItems.map((item) => {
            const { _id, star, table_name, users_in_table } = item;
            return (
              <TableItem
                key={_id}
                tableId={_id}
                tableName={table_name}
                isTableChecked={star}
                members={users_in_table}
              />
            );
          })}
          <div className="Table__Content__Item">
            <p>
              <span>Tạo bảng mới </span>
              <PlusOutlined />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
