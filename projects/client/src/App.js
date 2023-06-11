import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom";
import "./App.css";
import ProductsList from "./pages/productsList";
import CategoryPage from "./pages/categoryPage";

// const router = createBrowserRouter([
//   // {
//   //   path: "/",
//   //   element: <ProductsList />,
//   //   // errorElement: <ErrorPage />,
//   // },
//   { path: "/product", element: <ProductsList /> },
//   { path: "/category/:id", element: <CategoryPage /> },
// ]);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={ProductsList} path="/product" />
        <Route Component={CategoryPage} path="/category/:id" />
      </Routes>
    </BrowserRouter>

    // <main>
    //   <RouterProvider router={router} />
    // </main>
  );
}

export default App;
