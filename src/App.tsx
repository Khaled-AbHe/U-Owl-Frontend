import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { routes } from "./data/routes.data";
import MainLayout from "./layouts/MainLayout";

export function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} loader={undefined}>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              index={route.isIndex}
              path={route.path}
              element={<route.element />}
              action={route.action}
              loader={route.loader}
            />
          );
        })}
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}
