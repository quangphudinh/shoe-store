import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router , Routes, Route , Navigate } from 'react-router-dom'
import ProductDetail from './pages/ProductDetail.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route  path="/" element={<App />} />
        <Route  path="/detail" element={<ProductDetail />} />
      </Routes>
    </Router>
  </StrictMode>,
)
