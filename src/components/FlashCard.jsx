import React, { useState } from 'react';

const FlashCard = ({ card, onEdit, onDelete }) => {
  const { id, front, back, lastModified, status } = card;
  const [isEditing, setIsEditing] = useState(false);
  const [editedFront, setEditedFront] = useState(front);
  const [editedBack, setEditedBack] = useState(back);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleFrontChange = (e) => {
    setEditedFront(e.target.value);
  };

  const handleBackChange = (e) => {
    setEditedBack(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    onEdit(card, { id, front: editedFront, back: editedBack, lastModified, status });
  };

  const handleDelete = () => {
    onDelete(card);
  };

  return (
    <div className="flash-card">
      <div className="front">
        {isEditing ? (
          <input type="text" value={editedFront} onChange={handleFrontChange} />
        ) : (
          <p>{front}</p>
        )}
      </div>
      <div className="back">
        {isEditing ? (
          <input type="text" value={editedBack} onChange={handleBackChange} />
        ) : (
          <p>{back}</p>
        )}
        <p>Last Modified: {lastModified}</p>
        <p>Status: {status}</p>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashCard;
