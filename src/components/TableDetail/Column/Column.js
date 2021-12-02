import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { apiClient } from "../../../helper/api_client";
import ColumnItem from "../Items/ColumnItem";
import ItemDialog from "../Items/ItemDialog";
import "./Column.scss";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import { useParams } from "react-router";

export default function Column({
  colIndex,
  colId,
  colName,
  cardItems,
  userInTable,
  onReloadCard,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState();
  const [items, setItems] = useState([]);
  const [isColDialogOpen, setIsColDialogOpen] = useState(false);
  const [cardName, setCardName] = useState("");

  const params = useParams();
  const tableId = params.id;

  useEffect(() => {
    apiClient.patch(`/column/editColumn/${colId}`, {
      card_IDs: items.map((item) => ({
        card_ID: item.card_ID._id,
      })),
    });
  }, [items]);

  useEffect(() => {
    setItems(cardItems);
  }, [cardItems]);

  const reloadDialog = (id, userInTable) => {
    apiClient.get(`/card/${id}`).then((response) => {
      const { data } = response.data;
      setDialogContent({ ...data[0], userInTable });
    });
  };

  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
  };

  const handleOpenDialog = (dialogData) => {
    setIsDialogOpen(!isDialogOpen);

    reloadDialog(dialogData.itemKey, dialogData.userInTable);
  };

  const handleOpenColDialog = () => {
    setIsColDialogOpen(!isColDialogOpen);
  };

  const handleCreateCard = () => {
    if (cardName) {
      apiClient
        .post("/card/addCard", {
          column_ID: colId,
          name: cardName,
        })
        .then((response) => {
          setIsColDialogOpen();
          onReloadCard();
        });

      setCardName("");
    }
  };

  const handleCloseDialog = () => {
    onReloadCard();
    setDialogContent();
    setIsDialogOpen(!isDialogOpen);
  };

  const handleDeleteCol = () => {
    apiClient
      .delete(`column/deleteColumn/${colId}`, {
        tableID: tableId,
      })
      .then((response) => onReloadCard());
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
                <div
                  className="Column__header__sub"
                  onClick={handleDeleteCol}
                  style={{ cursor: "pointer" }}
                >
                  <DeleteOutlined />
                </div>
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
                      userInTable={userInTable}
                      deadLine={card_deadline}
                    />
                  );
                })}
                <div
                  className="Column__body__add"
                  onClick={handleOpenColDialog}
                >
                  <span>Thêm thẻ mới</span>
                </div>
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Modal
        visible={isColDialogOpen}
        title="Add new card"
        width={300}
        onCancel={handleOpenColDialog}
        footer={[
          <Button key="submit" type="primary" onClick={handleCreateCard}>
            Submit
          </Button>,
        ]}
        style={{ top: 100 }}
      >
        <div className="workModal">
          <div className="workModal__name">
            Card name:
            <Input value={cardName} onChange={(e) => handleCardNameChange(e)} />
          </div>
        </div>
      </Modal>

      <ItemDialog
        isDialogOpen={isDialogOpen}
        onOpenCloseDialog={handleCloseDialog}
        dialogContent={dialogContent}
        onReloadDialog={reloadDialog}
      />
    </>
  );
}
