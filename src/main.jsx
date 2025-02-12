import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ErrorPage from "./pages/errorpage.jsx";
import "./index.css";

//* React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/loginpage.jsx";
import RegisterPage from "./pages/registerpage.jsx";
import Product from "./pages/productpage.jsx";
import Profile from "./pages/profilepage.jsx";
import DetailProduct from "./pages/detailproduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/product",
    element: <Product></Product>,
  },
  {
    path: "/profile",
    element: <Profile></Profile>,
  },
  {
    path: "/product/:id",
    element: <DetailProduct></DetailProduct>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
