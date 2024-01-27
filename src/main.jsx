import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Sightings from "./Sightings.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import IndividualSightingInfo from "./IndividualSightingInfo.jsx";
import NewSightingSubmission from "./NewSightingSubmission.jsx";

const router = createBrowserRouter([
  {
    //this is also a new route
    path: "/",
    element: <App />,
    children: [
      //this is a new route
      {
        path: "/sightings",
        element: <Sightings />,
      },
    ],
  },

  {
    path: "/sightings/:sightingIndex",
    element: <IndividualSightingInfo />,
  },
  {
    path: "/sightings/new",
    element: <NewSightingSubmission />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
