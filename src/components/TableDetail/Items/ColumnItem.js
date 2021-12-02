import { useRef } from "react";
import "../Column/Column.scss";
import { Draggable } from "react-beautiful-dnd";
import { v4 } from "uuid";

const longContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad repudiandae explicabo iure alias eaque deleniti ex magnam esse natus, corrupti, eum dolore numquam. Ex temporibus laborum at dolore magnam soluta!";

export default function ColumnItem({
  title,
  content,
  onOpenDialog,
  itemIndex,
  itemKey,
  members,
  userInTable,
  deadLine,
}) {
  const handleDialog = () => {
    onOpenDialog({
      title,
      content,
      longContent,
      members,
      userInTable,
      itemKey,
      deadLine,
    });
  };

  return (
    <>
      <Draggable draggableId={itemKey} index={itemIndex}>
        {(provided) => (
          <div
            className="Column__body__item"
            onClick={handleDialog}
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <div className="Column__body__item__title">{title}</div>
            <div className="Column__body__item__content">{content}</div>
          </div>
        )}
      </Draggable>
    </>
  );
}
