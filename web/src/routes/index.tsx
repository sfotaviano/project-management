import { createBrowserRouter, RouterProvider } from "react-router";
import Project from "../pages/Project";
import Task from "../pages/Task";
import Report from "../pages/Report";
import PrivateLayout from "../components/private-layout";
import Login from "../pages/Login";
import SignUp from "../pages/SingUp";
import { useAuth } from "../contexts/auth";

export default function Router() {
  const { token } = useAuth();

  console.log("token", token);

  const router = createBrowserRouter([
    {
      path: "/",
      Component: PrivateLayout,
      children: [
        {
          path: "/projects",
          Component: Project,
        },
        {
          path: "/tasks",
          Component: Task,
        },
        {
          path: "/reports",
          Component: Report,
        },
      ],
    },
    {
      path: "/login",
      Component: Login,
    },
    {
      path: "/signup",
      Component: SignUp,
    },
  ]);

  return <RouterProvider router={router} />;
}
