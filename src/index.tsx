import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from '@/pages';
import FallbackPage from '@/pages/fallback';
import SuspensePage from '@/pages/suspense';
import ItemDetailPage from '@/pages/item';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/item/:id' element={<ItemDetailPage />} />
        <Route path='/fallback' element={<FallbackPage />} />
        <Route path='/suspense' element={<SuspensePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
