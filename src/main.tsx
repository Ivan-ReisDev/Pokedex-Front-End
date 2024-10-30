import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import { PokedexProvider } from './context/PokedexContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>

  <BrowserRouter>
      <PokedexProvider>
        <App />
      </PokedexProvider>
    </BrowserRouter>

  </StrictMode>,
)
