import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './component/provider/AuthProvider.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignIn from './component/login&out/SignIn.jsx'
import SignUp from './component/login&out/SignUp.jsx'
import Home from './component/home/Home.jsx'
import Dashboard from './component/userDas/Dashboard.jsx'
import AddTask from './component/userDas/AddTask.jsx'
import Private from './component/provider/Privet.jsx'
import UpdateTask from './component/userDas/UpdateTask.jsx'
import UseAxios from './component/hooks/UseAxios.js'

const axiosurl = UseAxios()
const queryClint = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/dashboard",
        element:<Private><Dashboard></Dashboard></Private>
      },
      {
        path:"/addTask",
        element:<Private><AddTask></AddTask></Private>
      },
      {
        path:"/updateTask/:id",
        element:<Private><UpdateTask></UpdateTask></Private>,
        loader: ({ params }) => axiosurl.get(`/task/${params.id}`)
      },
      {
        path:"/signin",
        element:<SignIn></SignIn>
      },
      {
        path:"/signup",
        element:<SignUp></SignUp>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <QueryClientProvider client={queryClint}>
    <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
