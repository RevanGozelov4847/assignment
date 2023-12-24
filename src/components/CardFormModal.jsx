import React from 'react';

const CardFormModal = ({ isNewCard, card, onClose, onSave, onChange, isEditing }) => {
  return (
    <div className={`modal ${isEditing ? 'edit-mode' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{isNewCard ? 'Create New Card' : 'Edit Card'}</h2>
        <label>
          Question:
          <input
            type="text"
            value={card.question}
            onChange={(e) => onChange('question', e.target.value)}
          />
        </label>
        <label>
          Answer:
          <input
            type="text"
            value={card.answer}
            onChange={(e) => onChange('answer', e.target.value)}
          />
        </label>
        <label>
          Status:
          <select
            value={card.status}
            onChange={(e) => onChange('status', e.target.value)}
          >
            <option value="Learned">Learned</option>
            <option value="Want to Learn">Want to Learn</option>
            <option value="Noted">Noted</option>
          </select>
        </label>
        <button onClick={onSave}>{isNewCard ? 'Create Card' : 'Save Changes'}</button>
      </div>
    </div>
  );
};

export default CardFormModal;
