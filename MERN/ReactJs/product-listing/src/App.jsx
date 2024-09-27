import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  const routes = createBrowserRouter(
    [
      {
        path: "/:slug?",
        // slug is an optional parameter
        element: <Home />
      }
    ]
  )
  return (
    <RouterProvider router={routes} />
  )
}
