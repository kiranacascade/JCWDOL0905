import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Pagination } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useParams } from "react-router-dom";
import { Category } from "../../components/category";
import { api } from "../../api/api";

export default function ProductsByCategory() {
  const [productsInfo, setProductsInfo] = useState([]);
  const [sort, setSort] = useState(1);

  // pagination
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    async function fetchProducts() {
      try {
        let url;

        switch (parseInt(sort)) {
          // sort by name A-Z
          case 1:
            url = `/inventory/fetch?order=product_name&sort=ASC&category=${id}&page=${activePage}`;
            break;
          // sort by name Z-A
          case 2:
            url = `/inventory/fetch?order=product_name&sort=DESC&category=${id}&page=${activePage}`;
            break;
          // sort by price L-H
          case 3:
            url = `/inventory/fetch?order=product_price&sort=ASC&category=${id}&page=${activePage}`;
            break;
          // sort by price H-L
          case 4:
            url = `/inventory/fetch?order=product_price&sort=DESC&category=${id}&page=${activePage}`;
            break;
          default:
            url = `/inventory/fetch?order=createdAt&sort=ASC&category=${id}&page=${activePage}`;
        }

        const productData = await api.get(url, {});
        console.log(productData.data);
        setProductsInfo(productData.data.data);
        setTotalPage(Math.ceil(productData.data.count / 12));
      } catch (err) {
        console.log(err);
      }
    }
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
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 md:max-w-4xl md:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <Category />

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
              <div className="flex flex-1 flex-col px-4 py-3">
                <h3 className="text-md font-medium text-gray-900 my-1">
                  {productInfo.Product.product_name}
                  {/* <a href={productInfo.Product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {productInfo.Product.name}
                  </a> */}
                </h3>

                <p className="text-md text-gray-500 my-1">{productInfo.Product.weight} gram</p>

                <div className="flex flex-1 flex-col justify-end">
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
      </div>
    </div>
  );
}
