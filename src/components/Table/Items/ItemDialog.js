import { Modal, Button } from "antd";

import "antd/dist/antd.css";

export default function ItemDialog({
  isDialogOpen,
  onOpenCloseDialog,
  ...remains
}) {
  const { title, content, longContent } = remains;
  return (
    <Modal
      visible={isDialogOpen}
      title={title}
      onOk={onOpenCloseDialog}
      onCancel={onOpenCloseDialog}
      footer={[
        <Button key="back" onClick={onOpenCloseDialog}>
          Return
        </Button>,
        <Button key="submit" type="primary" onClick={onOpenCloseDialog}>
          Submit
        </Button>,
      ]}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}
