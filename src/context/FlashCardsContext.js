import { createContext, useContext, useReducer } from "react";

const initialState = {
  cards: [],
  cardOrder: [],
};

const ActionTypes = {
  SET_CARDS: "SET_CARDS",
  ADD_CARD: "ADD_CARD",
  UPDATE_CARD: "UPDATE_CARD",
  DELETE_CARD: "DELETE_CARD",
  SET_CARD_ORDER: "SET_CARD_ORDER", 
};

const flashCardsReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_CARDS:
      return { ...state, cards: action.payload };
    case ActionTypes.ADD_CARD:
      return { ...state, cards: [...state.cards, action.payload] };
    case ActionTypes.UPDATE_CARD:
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === action.payload.id ? action.payload : card
        ),
      };
    case ActionTypes.DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload),
      };
    case ActionTypes.SET_CARD_ORDER:
      return { ...state, cardOrder: action.payload }; 
    default:
      return state;
  }
};

const FlashCardsContext = createContext();

const useFlashCards = () => {
  const context = useContext(FlashCardsContext);
  if (!context) {
    throw new Error("useFlashCards must be used within a FlashCardsProvider");
  }
  return context;
};

const FlashCardsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(flashCardsReducer, initialState);

  return (
    <FlashCardsContext.Provider
      value={{ state: state || initialState, dispatch }}
    >
      {children}
    </FlashCardsContext.Provider>
  );
};

export { FlashCardsProvider, useFlashCards, ActionTypes };
