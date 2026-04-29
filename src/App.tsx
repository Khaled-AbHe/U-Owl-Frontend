import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { routes } from "./data/routes.data";

export function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {routes.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={route.element ? <route.element /> : undefined} loader={route.loader} >
              {route.subroutes && route.subroutes.map((subRoute, index) => {
                return (
                  <Route
                    key={index}
                    index={subRoute.isIndex}
                    path={subRoute.path}
                    element={subRoute.element ? <subRoute.element /> : undefined}
                    action={subRoute.action}
                    loader={subRoute.loader}
                  />
                )
              })}
            </Route>
          )
        })}
      </Route>
    ),
  );

  return <RouterProvider router={router} />;
}
