import { StarFilled, StarOutlined } from "@ant-design/icons";
import classNames from "classnames";

function TableItem({
  tableId,
  tableName,
  isTableChecked,
  members,
  onPageChange,
}) {
  return (
    <div
      //   className={classNames({
      //     Table__Content__Item__Star: isTableChecked,
      //     Table__Content__Item: !isTableChecked,
      //   })}
      className={
        isTableChecked ? "Table__Content__Item__Star" : "Table__Content__Item"
      }
      onClick={onPageChange}
    >
      <h1>{tableName}</h1>
      {isTableChecked ? <StarFilled /> : <StarOutlined />}
    </div>
  );
}

export default TableItem;
