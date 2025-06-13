import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";
import Home from "./routes/Home.tsx";
import Login from "./routes/Login.tsx";
import ErrorPage from "./Error.tsx";
import Register from "./routes/Register.tsx";
import History from "./routes/History.tsx";
import Settings from "./routes/Setting.tsx";
import Search from "./routes/Search.tsx";
import Profile from "./routes/settings/profile.tsx";
import Library from "./routes/Library.tsx";

import "./fonts.ts";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "settings/profile",
        element: <Profile />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "library",
        element: <Library />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
