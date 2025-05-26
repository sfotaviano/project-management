import { createBrowserRouter, RouterProvider } from "react-router";
import Project from "../pages/Project";
import Task from "../pages/Task";
import Report from "../pages/Report";
import PrivateLayout from "../components/private-layout";

export default function Router() {
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
  ]);

  return <RouterProvider router={router} />;
}
