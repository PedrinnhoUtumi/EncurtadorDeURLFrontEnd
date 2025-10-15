import React, { StrictMode } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import { EncurtadorLinks } from './pages/EncurtadorLinks.jsx'
import { DadosProvider } from './Context/DadosContext.jsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
const rotas = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<EncurtadorLinks />} />
      <Route path="inicio" element={<EncurtadorLinks />} />
    </>
  )
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DadosProvider>
      <RouterProvider router={rotas} />
    </DadosProvider>
  </StrictMode>
);