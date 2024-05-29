import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {InventoryProvider } from './components/Inventory';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <InventoryProvider>
      <App />
    </InventoryProvider>
  </React.StrictMode>
);

reportWebVitals();