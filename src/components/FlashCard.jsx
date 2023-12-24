import React, { useState } from 'react';

const FlashCard = ({
  id,
  question,
  answer,
  status,
  lastModified,
  onEdit,
  onDelete,
  onCheckboxChange,
  isChecked,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flash-card-container" onClick={handleCardClick}>
      <div className={`flash-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-face card-front">
          <p>{question}</p>
        </div>
        <div className="card-face card-back">
          <p>{answer}</p>
        </div>
        <div className="card-actions">
          <button type="button" onClick={() => onEdit(id)}>
            Edit Card
          </button>
          <button type="button" onClick={() => onDelete(id)}>
            Delete Card
          </button>
        </div>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onCheckboxChange}
          />
          Select
        </label>
        <div className="card-status">{status}</div>
        <div className="card-last-modified">Last Modified: {lastModified}</div>
      </div>
    </div>
  );
};

export default FlashCard;





