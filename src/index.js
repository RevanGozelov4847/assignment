import React from 'react';
import App from './App';
import { FlashCardsProvider } from './context/FlashCardsContext';

import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FlashCardsProvider>
      <App />
    </FlashCardsProvider>
  </React.StrictMode>,
);

