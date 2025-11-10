import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GradualBlurMemo from './Components/GradualBlurMemo.jsx'
import { BrowserRouter } from 'react-router-dom'
// import '../public/Rostex-Oblique.ttf';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
   
    </BrowserRouter>
  </StrictMode>,
)
