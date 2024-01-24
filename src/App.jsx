import logo from "/logo.png";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
import QueryAll from "./Components/QueryAll";
import Query from "./Components/Query";

const queryClient = new QueryClient();

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Link to="/">Home</Link>
          <br />
          <Link to="/sightings">Sighting list</Link>
          <br />
          <Outlet />
        </>
      ),
      children: [
        {
          path: "/sightings",
          element: (
            <QueryClientProvider client={queryClient}>
              <QueryAll />
            </QueryClientProvider>
          ),
        },
        {
          path: "/sightings/:sightingId",
          element: (
            <QueryClientProvider client={queryClient}>
              <Query />
            </QueryClientProvider>
          ),
        },
        { path: "*", element: <>Nothing here!</> },
      ],
    },
  ]);

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
