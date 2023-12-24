import React, { useState } from 'react';

const FlashCard = ({ onEdit, onDelete }) => {
  const [isFlipped, setFlipped] = useState(false);
  const [isCheckboxChecked, setCheckboxChecked] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const handleCardClick = () => {
    setFlipped(!isFlipped);
  };

  const handleCheckboxChange = () => {
    setCheckboxChecked(!isCheckboxChecked);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className={`flash-card ${isFlipped ? 'flipped' : ''} ${
        isCheckboxChecked ? 'checkbox-checked' : ''
      } ${isHovered ? 'hovered' : ''}`}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-checkbox-container">
        <input
          type="checkbox"
          className="card-checkbox"
          onChange={handleCheckboxChange}
          checked={isCheckboxChecked}
        />
      </div>
      <div className="card-face card-front">
        {isHovered && (
          <div className="card-actions">
            <button type="button" onClick={onEdit}>
              Edit Card
            </button>
            <button type="button" onClick={onDelete}>
              Delete Card
            </button>
          </div>
        )}
      </div>
      <div className={`card-face card-back ${isFlipped ? 'clicked' : ''}`}>
      </div>
    </div>
  );
};

export default FlashCard;
