import * as React from "react";
import * as ReactDOM from "react-dom";
import Home from "./page";
// src/index.js or src/index.tsx
import 'font-awesome/css/font-awesome.min.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
