import "./App.css";
import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IndividualSighting from "./Components/IndividualSighting";
import Home from "./Components/Home";

function App() {
  const [sightings, setSightings] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home sightings={sightings} setSightings={setSightings} />,
    },
    {
      path: "/sightings/",
      children: [
        {
          path: ":sightingIndex",
          element: <IndividualSighting sightings={sightings} />,
        },
        {
          path: "filter",
          element: <Home sightings={sightings} setSightings={setSightings} />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
