import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ closeHandler, content }) => {
  const rootElement = document.getElementById("modal-root");
  const modalContainer = document.createElement("div");

  React.useEffect(() => {
    rootElement.appendChild(modalContainer);

    return () => {
      rootElement.removeChild(modalContainer);
    };
  }, [modalContainer, rootElement]);

  const renderModal = () => {
    return ReactDOM.createPortal(
      <div className="custom-modal-overlay">
        <div className="custom-modal-content">
          <button className="custom-modal-close-button" onClick={closeHandler}>
            Close
          </button>
          {content}
        </div>
      </div>,
      modalContainer
    );
  };

  return renderModal();
};

const EditForm = ({ cardInfo, onSaveHandler, onCancelHandler, onStatusChangeHandler }) => {
  const [editedCardInfo, setEditedCardInfo] = useState({ ...cardInfo });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCardInfo((prevCardInfo) => ({
      ...prevCardInfo,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onSaveHandler(editedCardInfo);
  };

  useEffect(() => {
    setEditedCardInfo({ ...cardInfo });
  }, [cardInfo]);

  return (
    <div>
      <h2>Edit Card Information</h2>
      <form>
        <label>
          Question:
          <input
            type="text"
            name="front"
            value={editedCardInfo.front}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Answer:
          <input
            type="text"
            name="back"
            value={editedCardInfo.back}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Card Status:
          <select
            value={editedCardInfo.status}
            onChange={(event) => {
              setEditedCardInfo({ ...editedCardInfo, status: event.target.value });
              onStatusChangeHandler(event.target.value);
            }}
          >
            <option value="Learned">Learned</option>
            <option value="Want to Learn">Want to Learn</option>
            <option value="Noted">Noted</option>
          </select>
        </label>
        <button type="button" onClick={handleSaveClick}>
          Save Card
        </button>
        <button type="button" onClick={onCancelHandler}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export { Modal, EditForm };
