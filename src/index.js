import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Exp1 from "./pages/exp1";
import Exp2 from "./pages/exp2";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/exp1",
    element: <Exp1 />,
  },
  {
    path: "/exp2",
    element: <Exp2 />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
