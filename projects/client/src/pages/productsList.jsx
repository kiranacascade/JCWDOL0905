import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Pagination } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default function ProductsList() {
  const [productsInfo, setProductsInfo] = useState([]);
  const [sort, setSort] = useState(0);
  const [categories, setCategories] = useState([]);

  // pagination
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await axios.get("http://localhost:8000/category/fetch", {});
        // console.log(categoriesData.data.data);
        setCategories(categoriesData.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    async function fetchProducts() {
      try {
        let url;

        switch (parseInt(sort)) {
          // sort by name A-Z
          case 1:
            url = `http://localhost:8000/inventory/fetch?order=product_name&sort=ASC&page=${activePage}`;
            break;
          // sort by name Z-A
          case 2:
            url = `http://localhost:8000/inventory/fetch?order=product_name&sort=DESC&page=${activePage}`;
            break;
          // sort by price L-H
          case 3:
            url = `http://localhost:8000/inventory/fetch?order=product_price&sort=ASC&page=${activePage}`;
            break;
          // sort by price H-L
          case 4:
            url = `http://localhost:8000/inventory/fetch?order=product_price&sort=DESC&page=${activePage}`;
            break;
          default:
            url = `http://localhost:8000/inventory/fetch?order=createdAt&sort=ASC&page=${activePage}`;
        }

        const productData = await axios.get(url, {});
        // console.log(productData.data.data);
        setProductsInfo(productData.data.data);
        setTotalPage(Math.ceil(productData.data.count / 12));
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategories();
    fetchProducts();
  }, [sort, activePage]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setActivePage(1); // Reset the active page when the sort option changes
  };

  function rupiah(price) {
    const priceString = price.toString();
    const len = priceString.length;
    let str = "";
    for (let i = 0; i < len; i++) {
      str += priceString[i];
      if ((len - i - 1) % 3 === 0 && i !== len - 1) {
        str += ".";
      }
    }
    return `Rp ${str}`;
  }
  return (
    <div className="bg-neutral-100">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="flex my-12 p-5 bg-white rounded-lg border border-gray-200 drop-shadow-md">
          {categories.map((category) => (
            <button key={category.id} className="space-y-2 m-3 h-max w-48">
              <a href={`http://localhost:3000/category/${category.id}`} className="flex flex-col justify-center items-center space-y-1">
                <img src={category.category_image} alt={category.category_name} className="w-full h-auto rounded-full overflow-visible" />
                <p className=" font-semibold text-gray-800 text-md">{category.category_name}</p>
              </a>
            </button>
          ))}
        </div>

        <div className="my-12 flex justify-end drop-shadow-md">
          <select className="w-72 rounded-md green border border-gray-200 active:border-green-500" id="sortBy" data-te-select-init value={sort} onChange={handleSortChange}>
            <option value="1">Sort by Product Name A-Z</option>
            <option value="2">Sort by Product Name Z-A</option>
            <option value="3">Sort by Price Lowest-Highest</option>
            <option value="4">Sort by Price Highest-Lowest</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-4 lg:gap-x-6">
          {productsInfo.map((productInfo) => (
            <div key={productInfo.id} className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white drop-shadow-md">
              <div className=" bg-gray-200 group-hover:opacity-75 sm:aspect-none">
                <div className="square-image-container">
                  <img src={productInfo.Product.product_image} alt={productInfo.Product.product_name} className="h-full w-full object-cover object-center sm:h-full sm:w-full" />
                </div>
              </div>
              <div className="flex flex-1 flex-col space-y-1 p-4">
                <h3 className="text-md font-medium text-gray-900">
                  {productInfo.Product.product_name}
                  {/* <a href={productInfo.Product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {productInfo.Product.name}
                  </a> */}
                </h3>

                {/* <p className="text-sm text-gray-500">{productInfo.Product.product_description}</p> */}
                <div className="flex flex-1 flex-col justify-end">
                  {/* <p className="text-sm italic text-gray-500">Stock : {productInfo.stock}</p> */}
                  <p className=" text-lg font-bold text-green-600">{rupiah(productInfo.Product.product_price)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="my-12 flex justify-center">
          <Pagination
            activePage={activePage}
            totalPages={totalPage}
            onPageChange={(e, pageInfo) => {
              setActivePage(pageInfo.activePage);
              console.log(pageInfo);
            }}
          />
        </div>

        {/* <Pagination /> */}
      </div>
    </div>
  );
}
