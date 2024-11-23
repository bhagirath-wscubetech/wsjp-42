import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WebsiteLayout from './Pages/website/Layout';
import AdminLayout from './Pages/admin/Layout';
import Home from './Pages/website/Home';
import Store from './Pages/website/Store';
import Cart from './Pages/website/Cart';
import MyProfile from './Pages/website/MyProfile';
import Checkout from './Pages/website/Checkout';
import CategoryAdd from "./Pages/admin/category/Add";
import CategoryEdit from "./Pages/admin/category/Edit";
import CategoryView from "./Pages/admin/category/View";
import ColorView from "./Pages/admin/color/View";
import ProductAdd from "./Pages/admin/product/Add";
import ProductEdit from "./Pages/admin/product/Edit";
import ProductView from "./Pages/admin/product/View";
import Dashboard from './Pages/admin/Dashboard';
import MultipeImage from './Pages/admin/product/MultipeImage';
import Login from './Pages/admin/Login';
import WebisteLogin from './Pages/website/Login';
import { useDispatch } from 'react-redux';
import { lsToCart } from './reducers/CartSlice';
import Register from './Pages/website/Register';
import { lsToUser } from './reducers/UserSlice';
import ThankYou from './Pages/website/ThankYou';

export default function App() {
  const dispatcher = useDispatch();
  useEffect(
    () => {
      dispatcher(lsToCart());
      dispatcher(lsToUser());
    }, []
  )

  const routes = createBrowserRouter(
    [
      {
        path: "/",
        element: <WebsiteLayout />,
        children: [
          {
            path: "",
            element: <Home />
          },
          {
            path: "store/:category_slug?",
            element: <Store />
          },
          {
            path: "thank-you/:order_id",
            element: <ThankYou />
          },
          {
            path: "cart",
            element: <Cart />
          },
          {
            path: "checkout",
            element: <Checkout />
          },
          {
            path: "my-profile",
            element: <MyProfile />
          }
        ]
      },
      {
        path: "/login",
        element: <WebisteLogin />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />
          },
          {
            path: "category/add",
            element: <CategoryAdd />
          },
          {
            path: "category/edit/:category_id",
            element: <CategoryEdit />
          },
          {
            path: "category",
            element: <CategoryView />
          },
          {
            path: "color",
            element: <ColorView />
          },
          {
            path: "product/add",
            element: <ProductAdd />
          },
          {
            path: "product",
            element: <ProductView />
          },
          {
            path: "product/edit/:product_id",
            element: <ProductEdit />
          },
          {
            path: "product/multiple-image/:product_id",
            element: <MultipeImage />
          }
        ]
      },
      {
        path: "/admin/login",
        element: <Login />
      }
    ]
  )

  return (
    <RouterProvider router={routes} />
  )
}
