import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Pagination } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Category } from "../../component/category";
import { api } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import NavBar from "../../component/NavBar";
import { ProductsList } from "../../component/productsList";
import { useSelector } from "react-redux";

export default function ProductsPage() {
  const [productsInfo, setProductsInfo] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchedName = searchParams.get("product_name");

  const branchId = useSelector((state) => state.branchSlice.branchId);  

  useEffect(() => {
    async function fetchProducts() {
      try {
        let url;
        setSearchValue(!searchedName ? "" : searchedName);

        switch (parseInt(sort)) {
          // sort by name A-Z
          case 1:
            url = `/inventory/?order=product_name&sort=ASC&name=${searchValue}&page=${activePage}`;
            break;
          // sort by name Z-A
          case 2:
            url = `/inventory/?order=product_name&sort=DESC&name=${searchValue}&page=${activePage}`;
            break;
          // sort by price L-H
          case 3:
            url = `/inventory/?order=product_price&sort=ASC&name=${searchValue}&page=${activePage}`;
            break;
          // sort by price H-L
          case 4:
            url = `/inventory/?order=product_price&sort=DESC&name=${searchValue}&page=${activePage}`;
            break;
          default:
            url = `/inventory/?order=createdAt&sort=ASC&name=${searchValue}&page=${activePage}`;
        }

        const productData = await api.get(url, {
          params : {
            branchId
          }
        });

        searchedName && productData.data.data.length < 1 && toast.error(`${searchValue} is not found`);
        setProductsInfo(productData.data.data);

        console.log("products", productData.data.data);
        setTotalPage(Math.ceil(productData.data.count / 12));
      } catch (err) {
        console.log(err);
      }
    }
    fetchProducts();
  }, [sort, searchValue, activePage]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setActivePage(1);
  };

  return (
    <div className="bg-neutral-100 min-h-screen">
      <NavBar />
      <div className="mx-auto max-w-2xl py-1 px-4 sm:py-8 sm:px-6 md:max-w-4xl md:px-6 md:py-6 lg:max-w-7xl lg:px-8 md:py-6">
        <h2 className="sr-only">Products</h2>
        
        <Toaster />
        <Category />

        <div className="my-12 flex justify-end drop-shadow-md">
          <select className="w-72 rounded-md border border-gray-200 focus:border-green-500 active:border-green-500 hover:border-green-500 target:border-green-500" id="sortBy" data-te-select-init value={sort} onChange={handleSortChange}>
            <option value="1">Sort by Product Name A-Z</option>
            <option value="2">Sort by Product Name Z-A</option>
            <option value="3">Sort by Price Lowest-Highest</option>
            <option value="4">Sort by Price Highest-Lowest</option>
          </select>
        </div>

        <ProductsList productsInfo={productsInfo} />

        <div className="my-12 flex justify-center">
          <Pagination
            activePage={activePage}
            totalPages={totalPage}
            onPageChange={(e, pageInfo) => {
              setActivePage(pageInfo.activePage);
            }}
          />
        </div>
      </div>
    </div>
  );
}
