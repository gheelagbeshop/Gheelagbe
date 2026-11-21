import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

import Root from "./components/Root";
import HomePage from "./Pages/HomePage";
import AboutUsPage from "./Pages/AboutUsPage";
import ProductsPage from "./Pages/Products";
import ContactUs from "./Pages/ContactUs";
import ProductDetails from "./Pages/ProductDetails";
import CartPage from "./Pages/CartPage";
import NotFoundPage from "./Pages/NotFoundPage";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderSuccessPage from "./Pages/OrderSuccessPage";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const router = createBrowserRouter([
  {
    
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutUsPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "shop", element: <ProductsPage /> },
      { path: "product/:slug", element: <ProductDetails /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "order-success", element: <OrderSuccessPage /> },
      { path: "contact", element: <ContactUs /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
      <Analytics />
      <SpeedInsights />
    </LanguageProvider>
  );
}
