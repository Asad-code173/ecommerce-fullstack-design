import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/layout/layout";
import AdminLayout from "./Admin/AdminComponents/AdminLayout";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";

// Lazy pages
const Home = lazy(() => import("./pages/Home"));
const ProductListingPage = lazy(() => import("./pages/ProductListingpage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetails"));
const CartPage = lazy(() => import("./pages/Cart"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/Signin"));

// Admin pages
const AdminDashboard = lazy(() => import("../src/Admin/Pages/Dashboard"));
const Categories = lazy(() => import("../src/Admin/Pages/Categories"));
const Products = lazy(() => import("../src/Admin/Pages/Products/Products"));
const CreateProduct = lazy(() => import("../src/Admin/Pages/Products/CreateProducts"));

// ProtectedRoute
const ProtectedRoute = lazy(() => import("../src/components/ProtectedRoute"));

const Loading = () => <div className="p-6">Loading...</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Suspense fallback={<Loading />}><Home /></Suspense> },
      { path: "products/:category", element: <Suspense fallback={<Loading />}><ProductListingPage /></Suspense> },
      { path: "product/:slug", element: <Suspense fallback={<Loading />}><ProductDetailsPage /></Suspense> },
      { path: "cart", element: <Suspense fallback={<Loading />}><CartPage /></Suspense> },
      { path: "sign-up", element: <Suspense fallback={<Loading />}><SignUp /></Suspense> },
      { path: "sign-in", element: <Suspense fallback={<Loading />}><SignIn /></Suspense> },
    ],
  },
  {
    path: "admin",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      { path: "dashboard", element: <Suspense fallback={<div>Loading...</div>}><AdminDashboard /></Suspense> },
      { path: "categories", element: <Suspense fallback={<div>Loading...</div>}><Categories /></Suspense> },
      { path: "products", element: <Suspense fallback={<div>Loading...</div>}><Products /></Suspense> },
      { path: "products/create-products", element: <Suspense fallback={<div>Loading...</div>}><CreateProduct /></Suspense> },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
