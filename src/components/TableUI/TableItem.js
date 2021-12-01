import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const colorPallete = [
  "border-red-400",
  "border-yellow-400",
  "border-green-400",
  "border-gray-400",
  "border-blue-400",
  "border-indigo-400",
  "border-purple-400",
  "border-pink-400",
];

function TableItem({
  tableId,
  tableName,
  isTableChecked,
  members,
  onPageChange,
  onMarkedTable,
}) {
  const randColor =
    colorPallete[Math.floor(Math.random() * colorPallete.length)];

  const [borderColor, setBorderColor] = useState("");

  useEffect(() => {
    setBorderColor(randColor);
  }, []);

  return (
    <>
      <div className={"Table__Content__Item border-l-15 " + `${borderColor}`}>
        <div
          className={
            isTableChecked
              ? "Table__Content__Item__Star"
              : "Table__Content__Item__Non"
          }
          onClick={onPageChange}
        >
          <div>
            <h1>{tableName}</h1>
          </div>
        </div>
        <div className="Table__Content__Item__Icon">
          {isTableChecked ? (
            <StarFilled className="Filled" onClick={onMarkedTable} />
          ) : (
            <StarOutlined className="Outline" onClick={onMarkedTable} />
          )}
        </div>
      </div>
    </>
  );
}

export default TableItem;
