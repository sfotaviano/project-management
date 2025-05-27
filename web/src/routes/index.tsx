import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router";
import Project from "../pages/Project";
import Task from "../pages/Task";
import Report from "../pages/Report";
import PrivateLayout from "../components/private-layout";
import Login from "../pages/Login";
import SignUp from "../pages/SingUp";
import { useAuth } from "../contexts/auth";

function RequireAuth() {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

function GuestGuard() {
  const { token } = useAuth();
  return token ? <Navigate to="/projects" replace /> : <Outlet />;
}

export default function Router() {
  const router = createBrowserRouter([
    {
      element: <RequireAuth />, // Protege todas as rotas filhas
      children: [
        {
          path: "/",
          element: <PrivateLayout />,
          children: [
            { path: "/projects", element: <Project /> },
            { path: "/tasks", element: <Task /> },
            { path: "/reports", element: <Report /> },
          ],
        },
      ],
    },
    {
      element: <GuestGuard />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <SignUp /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
