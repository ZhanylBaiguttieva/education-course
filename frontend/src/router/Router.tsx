import { createBrowserRouter } from 'react-router-dom';
import { appRoutes } from '../utils/constants';
import Layout from '../Layout/Layout';
import NotFound from '../components/UI/NotFound/NotFound.tsx';
import Home from '../components/UI/Home/Home.tsx';
import Register from '../features/users/containers/Register.tsx';
import Login from '../features/users/containers/Login.tsx';
import UserProfile from '../features/users/components/UserProfile.tsx';
import Courses from '../features/courses/components/Courses.tsx';
import AdminProfile from '../features/users/components/AdminProfile.tsx';


export const router = createBrowserRouter([
  {
    path: appRoutes.home,
    element: <Layout />,
    children: [
      {
        path: appRoutes.home,
        element: <Home />,
      },
      {
        path: appRoutes.register,
        element: <Register />,
      },
      {
        path: appRoutes.login,
        element: <Login />,
      },
      {
        path: appRoutes.notFound,
        element: <NotFound />,
      },
      {
        path: appRoutes.profile,
        element: <UserProfile />,
      },
      {
        path: appRoutes.adminProfile,
        element: <AdminProfile/>,
        children: [
          {
            path: appRoutes.courses,
            element: <Courses/>,
          },
          {
            path: appRoutes.courses,
            element: <Courses/>,
          },
        ]
      },
    ],
  },

]);