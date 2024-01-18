import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sightings from "./Components/Sightings";
import AllSightings from "./Components/AllSightings";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Sightings />
          <br />
        </div>
      ),
    },
    {
      path: "/:sightingIndex",
      element: (
        <div>
          <Sightings />
          <br />
        </div>
      ),
    },
    {
      path: "/allsightings",
      element: (
        <div>
          <AllSightings />
          <br />
        </div>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
