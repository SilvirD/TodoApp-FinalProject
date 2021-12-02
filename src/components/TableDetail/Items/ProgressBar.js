import { Progress } from "antd";
import { useMemo } from "react";

export default function ProgressBar({ itemArr }) {
  const percent = useMemo(() => {
    const checkedTask = itemArr.reduce(
      (calc, curr) => (curr.subTask_ID.subtask_checked ? calc + 1 : calc),
      0
    );
    return Math.floor((checkedTask / itemArr.length) * 100);
  }, [itemArr]);

  return <Progress percent={percent} />;
}
