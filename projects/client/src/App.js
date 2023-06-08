// import "@/styles/utils.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ProductsList from "./pages/productsList";
import CategoryList from "./pages/categoryList";
import { useEffect, useState } from "react";
import axios from "axios";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <ProductsList />,
  //   // errorElement: <ErrorPage />,
  // },
  { path: "/product", element: <ProductsList /> },
  { path: "/category/:id", element: <CategoryList /> },
]);

function App() {
  // const [message, setMessage] = useState("");
  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/greetings`);
  //     setMessage(data?.message || "");
  //   })();
  // }, []);
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
