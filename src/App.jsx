import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Sightings from "./sightings";
import IndividualSightings from "./individualSightings";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sightings />,
    },
    {
      path: "/sightings/:sightingIndex",
      element: <IndividualSightings />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
