import React, { StrictMode } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import { EncurtadorLinks } from './pages/EncurtadorLinks.jsx'
import { DadosProvider } from './Context/DadosContext.jsx';
import { Layout } from './pages/_Layout.jsx' 

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
const rotas = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<EncurtadorLinks />} />
      <Route path="inicio" element={<EncurtadorLinks />} />
    </Route>
  )
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DadosProvider>
      <RouterProvider router={rotas} />
    </DadosProvider>
  </StrictMode>
);