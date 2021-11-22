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
        return <Column key={column._id} colIndex={index} colId={column._id} />;
      })}
    </div>
  );
}
