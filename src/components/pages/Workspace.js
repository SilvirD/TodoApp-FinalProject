import '../../dist/styles/Workspace.css';
import { useState } from 'react';
import FormModal from '../Workspace/FormModal';
import Card from '../Workspace/Card';

const Workspace = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cardInfo, setCardInfo] = useState([
    {
      name: 'Card 1',
      description: 'This is card 1',
    },
    {
      name: 'Card 2',
      description: 'This is card 2',
    },
  ]);

  return (
    <div className="workspace">
      <div className="toolbar">
        <button className="btn-create" onClick={() => setIsOpen(true)} >
          Tạo không gian mới
        </button>
      </div>

      <FormModal open={isOpen} cInfo={cardInfo} setCardInfo={() => setCardInfo(cardInfo)} onClose={() => setIsOpen(false)} />

      <div className="browser">
        <h1>Không gian của bạn</h1>

        <div className="bar">
          {
            cardInfo.map(card => (
              <Card name={card.name} description={card.description} />
            ))
          }
          {/* <Card name={cardInfo[0].name} description={cardInfo[0].description} /> */}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
