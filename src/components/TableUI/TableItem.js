import { StarFilled, StarOutlined } from "@ant-design/icons";

function TableItem({
  tableId,
  tableName,
  isTableChecked,
  members,
  onPageChange,
  onMarkedTable,
}) {
  return (
    <div
      className={
        isTableChecked ? "Table__Content__Item__Star" : "Table__Content__Item"
      }
    >
      <div onClick={onPageChange}>
        <h1>{tableName}</h1>
      </div>
      <div onClick={onMarkedTable}>
        {isTableChecked ? <StarFilled /> : <StarOutlined />}
      </div>
    </div>
  );
}

export default TableItem;
