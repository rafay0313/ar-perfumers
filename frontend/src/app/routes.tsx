import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";
import { Cart } from "./pages/Cart";
import React from "react";
import { Header } from "./components/layout/Header";
import { Footer, LuxuryLoader } from "./components/layout/Footer";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartProvider>
      <LuxuryLoader />
      <Toaster position="bottom-right" theme="dark" closeButton />
      <Header />
      {children}
      <Footer />
    </CartProvider>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout children={<Home />} />,
  },
  {
    path: "/shop",
    element: <Layout children={<Shop />} />,
  },
  {
    path: "/product/:id",
    element: <Layout children={<ProductDetail />} />,
  },
  {
    path: "/login",
    element: <Layout children={<Login />} />,
  },
  {
    path: "/admin",
    element: <Layout children={<Admin />} />,
  },
  {
    path: "/cart",
    element: <Layout children={<Cart />} />,
  },
  {
    path: "*",
    element: <Layout children={<Home />} />, // Defaulting to Home for now
  }
]);
