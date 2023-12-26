import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ onClose, children }) => {
  const modalRoot = document.getElementById("modal-root");
  const modalContainer = document.createElement("div");

  React.useEffect(() => {
    modalRoot.appendChild(modalContainer);

    return () => {
      modalRoot.removeChild(modalContainer);
    };
  }, [modalContainer, modalRoot]);

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>,
    modalContainer
  );
};

const EditForm = ({ card, onSave, onCancel }) => {
  const [editedCard, setEditedCard] = useState({ ...card });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedCard);
  };

  useEffect(() => {
    setEditedCard({ ...card });
  }, [card]);

  return (
    <div>
      <h2>Edit Card</h2>
      <form>
        <label>
          Question:
          <input
            type="text"
            name="front"
            value={editedCard.front}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Answer:
          <input
            type="text"
            name="back"
            value={editedCard.back}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export { Modal, EditForm };
