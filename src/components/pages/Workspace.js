import '../../dist/styles/Workspace.css';
import { useState } from 'react';
import FormModal from '../Workspace/FormModal';
import Card from '../Workspace/Card';

const Workspace = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="workspace">
      <div className="toolbar">
        <button className="btn-create" onClick={() => setIsOpen(true)} >
          Tạo không gian mới
        </button>
      </div>

      <FormModal open={isOpen} onClose={() => setIsOpen(false)} />

      <div className="browser">
        <h1>Không gian của bạn</h1>

        <div className="bar">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
