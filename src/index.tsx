import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import FallbackPage from '@/pages/fallback';
import App from './App';
import SuspensePage from './pages/suspense';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/fallback' element={<FallbackPage />} />
        <Route path='/suspense' element={<SuspensePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
