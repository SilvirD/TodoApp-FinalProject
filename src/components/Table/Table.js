import axios from "axios";
import { useEffect, useState } from "react";
import Column from "./Column/Column";

export default function Table() {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/column/61a30208995bdb1b204b6a81`) //tam thoi
      .then((response) => {
        const { data } = response.data;
        setColumns(data);
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
