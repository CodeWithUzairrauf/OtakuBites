import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { XPProvider } from "./pages/Home/XpContent";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <XPProvider>
        <App />
      </XPProvider>
    </BrowserRouter>,
  </StrictMode>,
)
