import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createRoutesFromElements, RouterProvider, Route, createBrowserRouter } from 'react-router-dom';
import { Layout } from './pages/_Layout';


const rotas = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>

    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>
);