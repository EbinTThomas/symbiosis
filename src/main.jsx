import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LayoutProvider } from './pages/Common/LayoutContext.jsx'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LayoutProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </LayoutProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode >,
)
