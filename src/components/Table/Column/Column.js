import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { apiClient } from "../../../helper/api_client";
import ColumnItem from "../Items/ColumnItem";
import ItemDialog from "../Items/ItemDialog";
import "./Column.scss";

export default function Column({ colIndex, colId, colName, cardItems }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState();
  const [items, setItems] = useState(cardItems);

  useEffect(() => {
    apiClient.patch(`/column/editColumn/${colId}`, {
      card_IDs: items.map((item) => ({
        card_ID: item.card_ID._id,
      })),
    });
  }, [items]);

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
                <div className="Column__header__main">{colName}</div>
                <div className="Column__header__sub"></div>
              </div>
              <div className="Column__body">
                {items.map((item, index) => {
                  const {
                    _id,
                    card_name,
                    card_desc,
                    users_in_card,
                    card_deadline,
                  } = item.card_ID;
                  return (
                    <ColumnItem
                      key={_id}
                      itemKey={_id}
                      itemIndex={index}
                      title={card_name}
                      content={card_desc}
                      onOpenDialog={handleOpenDialog}
                      members={users_in_card}
                      deadLine={card_deadline}
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
