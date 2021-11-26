import axios from "axios";
import { useEffect, useState } from "react";
import Column from "./Column/Column";

export default function Table() {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5005/column`).then((response) => {
      setColumns(response.data);
    });
  }, []);

  return (
    <div
      className="Table"
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
  );
}
