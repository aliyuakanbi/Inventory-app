import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { UserProvider } from './UserContext'; // ✅ import context provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider> {/* ✅ Wrap app in UserProvider */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
