import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';

// Render the app without ClerkProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
