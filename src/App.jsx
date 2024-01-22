import logo from "/logo.png";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
  Link,
} from "react-router-dom";
import QueryAll from "./Components/QueryAll";
import Query from "./Components/Query";

const queryClient = new QueryClient();

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <>
            <Link to="/">Home</Link> <br />
            <br />
            <Outlet />
          </>
        }>
        <Route
          index
          element={
            <QueryClientProvider client={queryClient}>
              <QueryAll />
            </QueryClientProvider>
          }
        />
        {/* Route that renders individual sightings */}
        <Route
          path="sightings/:sightingId"
          element={
            <QueryClientProvider client={queryClient}>
              <Query />
            </QueryClientProvider>
          }
        />
        {/* Route that matches all other paths */}
        <Route path="*" element={"Nothing here!"} />
      </Route>
    )
  );

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="React logo" />
      </div>
      <h1>Bigfoot Frontend </h1>
      <RouterProvider router={router} />
    </>
  );
}
