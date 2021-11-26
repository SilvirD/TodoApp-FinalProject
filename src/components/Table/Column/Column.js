import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ColumnItem from "../Items/ColumnItem";
import ItemDialog from "../Items/ItemDialog";
import { tableMockData } from "../TableItem_mockdata";
import "./Column.scss";
import axios from "axios";

const currentOrder = tableMockData.map((item) => item.id);

export default function Column({ colIndex, colId, colName, cardItems }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState();
  const [items, setItems] = useState([]);

  const [order, setOrder] = useState(currentOrder);

  useEffect(() => {
    axios.get(`http://localhost:5005/card/${colId}`).then((response) => {
      const { data } = response.data;
      setItems(data);
    });
  }, []);

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
    setOrder(() => newItem.map((item) => item._id));
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
                  const { _id, card_name, card_desc, users_in_card } = item;
                  return (
                    <ColumnItem
                      itemIndex={index}
                      itemKey={_id}
                      key={_id}
                      title={card_name}
                      content={card_desc}
                      onOpenDialog={handleOpenDialog}
                      members={users_in_card}
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
