import { v4 } from "uuid";
import Column from "./Column/Column";

const arr = new Array(10).fill(1);

export default function Table() {
  return (
    <div
      className="Table"
      style={{ display: "flex", margin: "10px", overflowX: "auto" }}
    >
      {arr.map((elem, index) => {
        return <Column key={v4()} colIndex={index} />;
      })}
    </div>
  );
}
