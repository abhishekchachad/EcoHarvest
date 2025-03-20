import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css';
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';

// Import your Publishable Key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check if the Publishable Key is loaded correctly
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key. Please check your .env file.');
}

// Log the Publishable Key for debugging
console.log('Clerk Publishable Key:', PUBLISHABLE_KEY);

// Render the app with ClerkProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </StrictMode>
);