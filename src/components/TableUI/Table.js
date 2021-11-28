import React from "react";
import { Button, Checkbox, Modal, Progress } from "antd";
import "antd/dist/antd.css";
import {
  StarFilled,
  StarOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./Table.scss";

function Table() {
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
          <div className="Table__Content__Item">
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
          </div>
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
