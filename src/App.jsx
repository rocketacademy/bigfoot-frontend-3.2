import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sightings from "./Components/sightings";

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
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
