import React, { useState } from "react";

const FlashCard = ({
  card,
  onEdit,
  onDelete,
  onSelect,
  isSelected,
}) => {
  const [showFront, setShowFront] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [editFront, setEditFront] = useState(card.front);
  const [editBack, setEditBack] = useState(card.back);
  const [editStatus, setEditStatus] = useState(card.status);

const handleToggleCard = (e) => {
  if (e.target.tagName.toLowerCase() === 'input' && e.target.type === 'checkbox') {
    return;
  }

  setShowFront(!showFront);
};

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleEdit = () => {
    onEdit({ ...card, front: editFront, back: editBack, status: editStatus });
  };

  return (
    <div
      className={`flash-card ${isHovered ? "hovered" : ""} ${
        showFront ? "" : "flipped"
      }`}
      onClick={handleToggleCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-header">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(card)}
        />
      </div>
      {showFront ? (
        <div className="front">
          <p className="non-transformed-text">{card.front}</p>
          <div className="additional-info">
            <p>Last Modified: {card.lastModified}</p>
            <p>Status: {card.status}</p>
          </div>
          {isHovered && (
            <div className="front-actions">
              <div className="edit-delete-wrapper">
                <button onClick={() => onEdit(card)}>Edit</button>
                <button onClick={() => onDelete(card.id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="back">
          <p className="non-transformed-text">{card.back}</p>
          <div className="additional-info">
            <p>Last Modified: {card.lastModified}</p>
            <p>Status: {card.status}</p>
          </div>
          {isHovered && (
            <div className="card-actions">
              <div className="edit-delete-wrapper">
                <button onClick={() => onEdit(card)}>Edit</button>
                <button onClick={() => onDelete(card.id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      )}
      {isHovered && showFront && (
        <div className="edit-inputs">
          <input
            type="text"
            value={editFront}
            onChange={(e) => setEditFront(e.target.value)}
          />
          <input
            type="text"
            value={editBack}
            onChange={(e) => setEditBack(e.target.value)}
          />
          <select
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
          >
            <option value="Learned">Learned</option>
            <option value="Want to Learn">Want to Learn</option>
            <option value="Noted">Noted</option>
          </select>
          <button onClick={handleEdit}>Save</button>
        </div>
      )}
    </div>
  );
};

export default FlashCard;
