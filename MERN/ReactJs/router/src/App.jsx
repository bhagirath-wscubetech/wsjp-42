import React from 'react'
import Home from './Pages/Home'
import Blogs from './Pages/Blogs'
import BlogDetailsPage from './Pages/BlogDetails';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from "./Pages/About";

export default function App() {
  const routes = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/blogs",
        element: <Blogs />
      },
      {
        path: "/details",
        element: <BlogDetailsPage />
      }
    ]
  )
  return (
    <RouterProvider router={routes} />
  )
}
