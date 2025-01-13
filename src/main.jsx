import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./Auth/SignInPage";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path :"/",
    element:<Home/>
  },
  {
    path: "/auth/signin",
    element: <SignInPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider  publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider  router={router} />
    </ClerkProvider>
  </StrictMode>
);
