import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ColumnItem from "../Items/ColumnItem";
import ItemDialog from "../Items/ItemDialog";
import { tableMockData } from "../TableItem_mockdata";
import "./Column.scss";

export default function Column({ colIndex }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState();
  const [items, setItems] = useState(tableMockData);

  const handleOpenDialog = (dialogData) => {
    setIsDialogOpen(!isDialogOpen);
    setDialogContent(dialogData);
  };

  const handleCloseDialog = () => {
    setDialogContent();
    setIsDialogOpen(!isDialogOpen);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newItem = Array.from(items);
    const [reorderedItem] = newItem.splice(result.source.index, 1);
    newItem.splice(result.destination.index, 0, reorderedItem);

    setItems(newItem);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={colIndex.toString()}>
          {(provided) => (
            <div
              className="Column"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div className="Column__header">
                <div className="Column__header__main">ABCDEF</div>
                <div className="Column__header__sub"></div>
              </div>
              <div className="Column__body">
                {items.map((item, index) => {
                  const { id, title, content } = item;
                  return (
                    <ColumnItem
                      itemIndex={index}
                      itemKey={id}
                      key={id}
                      title={title}
                      content={content}
                      onOpenDialog={handleOpenDialog}
                    />
                  );
                })}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <ItemDialog
        isDialogOpen={isDialogOpen}
        onOpenCloseDialog={handleCloseDialog}
        {...dialogContent}
      />
    </>
  );
}
