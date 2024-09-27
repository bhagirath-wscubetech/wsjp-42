import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import ViewQuiz from './pages/ViewQuiz'
import AddQuiz from './pages/AddQuiz'
import Play from './pages/Play'
const firebaseConfig = {
  apiKey: "AIzaSyCXyxpdMNXy3nCDav8Y6j0gT3htEbOhaRY",
  authDomain: "wsjp42-4576e.firebaseapp.com",
  databaseURL: "https://wsjp42-4576e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wsjp42-4576e",
  storageBucket: "wsjp42-4576e.appspot.com",
  messagingSenderId: "445081888325",
  appId: "1:445081888325:web:f2fbcdd07c1978a3fde52c",
  measurementId: "G-XZ1EQ06YZP"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default function App() {
  const routes = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <Home />
          },
          {
            path: "play",
            element: <Play />
          },
          {
            path: "login",
            element: <Login />
          },
          {
            path: "register",
            element: <Register />
          },
          {
            path: "add-quiz",
            element: <AddQuiz />
          },
          {
            path: "view-quiz",
            element: <ViewQuiz />
          }
        ]
      }
    ]
  )
  return (
    <RouterProvider router={routes} />
  )
}
