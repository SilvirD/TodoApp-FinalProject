import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiClient } from "../../helper/api_client";
import Column from "./Column/Column";

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
