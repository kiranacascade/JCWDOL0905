import moment from "moment";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Pagination from "../PaginationRowPerPage";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROLE } from "../../constant/role";
import { api } from "../../api/api";
import ReactDatePicker from "react-datepicker";
import PopoverFilter from "../PopoverFilter";

function Table({ tableData }) {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle px-4 sm:px-6 md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {" "}
                    ID Transaction{" "}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {" "}
                    Branch Name{" "}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    {" "}
                    Date{" "}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    {" "}
                    User Name{" "}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    {" "}
                    Product Name{" "}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    {" "}
                    Price (IDR){" "}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    {" "}
                    Sold Quantity{" "}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    {" "}
                    Total Price (IDR){" "}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y text-left divide-gray-200 bg-white">
                {tableData.map((row) => (
                  <tr key={row.email}>
                    <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {" "}
                      {row.id || ""}{" "}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                      {" "}
                      {row.branchName || ""}{" "}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                      {" "}
                      {moment(row.createdAt).format("YYYY-MM-DD HH:mm:ss") ||
                        ""}{" "}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                      {" "}
                      {row.userName || ""}{" "}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                      {" "}
                      {row.productName || ""}{" "}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                      {" "}
                      {row.priceIdr || ""}{" "}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                      {" "}
                      {row.soldQuantity || ""}{" "}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                      {" "}
                      {row.totalPriceIdr || ""}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductSalesReport() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [limit, setLimit] = useState(Number(searchParams.get("limit")) || 5);
  const totalPages = 10;
  const [branchId, setBranchId] = useState("All");
  const [storeData, setStoreData] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [orderBy, setOrderBy] = useState((searchParams.get("orderBy")) || "id");
  const [sortDirection, setSortDirection] = useState((searchParams.get("sortDirection")) || "ASC")

  const dummyData =  [{
    "id": "vUmJTzukVS",
    "branchName": "TgpQvW",
    "createdAt": "2023-07-03T09:59:15.736Z",
    "userName": "8w7Wpc0aW",
    "productName": "BKKWZwqm",
    "priceIdr": 41268,
    "soldQuantity": 8,
    "totalPriceIdr": 330144
  }, {
    "id": "q8CLpWLdGH",
    "branchName": "bY2",
    "createdAt": "2023-07-03T09:59:15.736Z",
    "userName": "v0JUY1K9ox",
    "productName": "9C24ov",
    "priceIdr": 99504,
    "soldQuantity": 1,
    "totalPriceIdr": 99504
  }, {
    "id": "9oc3LYhboy",
    "branchName": "RbZ",
    "createdAt": "2023-07-03T09:59:15.736Z",
    "userName": "x0Z",
    "productName": "25",
    "priceIdr": 57316,
    "soldQuantity": 1,
    "totalPriceIdr": 57316
  }, {
    "id": "dUZBD2595Q",
    "branchName": "DMN4yZk68n",
    "createdAt": "2023-07-03T09:59:15.736Z",
    "userName": "B",
    "productName": "R43tWX",
    "priceIdr": 48573,
    "soldQuantity": 2,
    "totalPriceIdr": 97146
  }, {
    "id": "QVsFMvAQjE",
    "branchName": "juHPol3",
    "createdAt": "2023-07-03T09:59:15.736Z",
    "userName": "gm",
    "productName": "LyGl",
    "priceIdr": 86505,
    "soldQuantity": 3,
    "totalPriceIdr": 259515
  }] 

  const { id_branch, role } = useSelector((state) => state.adminSlice);

  const renderSearchByBranch = () => {
    return role === ROLE.SUPER_ADMIN ? (
      <div className="flex items-center space-x-4">
        <p className="w-24 text-right">Branch Store:</p>
        <select
          id="storeId"
          name="storeId"
          className="w-52"
          onChange={(e) => setBranchId(e.target.value)}
          value={branchId || ""}
        >
          <option value="All">All Branch</option>
          {storeData.map((data, index) => (
            <option key={index} value={data.id}>
              {data.branch_name}
            </option>
          ))}
        </select>
      </div>
    ) : null;
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowPerPage = (newLimit) => {
    setLimit(newLimit);
  };

  useEffect(() => {
    setSearchParams({ page: page.toString(), limit: limit.toString(), orderBy: orderBy, sortDirection: sortDirection});
  }, [page, limit, setSearchParams, orderBy, sortDirection]);

  const getListOfStoreData = async () => {
    try {
      const response = await api.get(`branch`);
      setStoreData(response.data.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setBranchId(id_branch);
    getListOfStoreData();
  }, [id_branch]);

  return (
    <div>
      <div className="flex justify-end my-8">
        <PopoverFilter>
        <div className="flex flex-wrap space-y-2">
              <div className="flex items-center space-x-4">
                <p className="w-24 text-right">Start Date:</p>
                <ReactDatePicker
                  placeholderText="Start Date"
                  selected={selectedStartDate}
                  className="w-52 rounded-md border px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 text-sm leading-6"
                  id="start_date"
                  onChange={(date) => setSelectedStartDate(date)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <p className="w-24 text-right">End Date:</p>
                <ReactDatePicker
                  placeholderText="End Date"
                  selected={selectedEndDate}
                  className="w-52 rounded-md border px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 text-sm leading-6"
                  id="end_date"
                  onChange={(date) => setSelectedEndDate(date)}
                />
              </div>
              {renderSearchByBranch()}
              <div className="flex items-center space-x-4">
                <p className="w-24 text-right">Sort By:</p>
                <select
                  id="orderBy"
                  name="orderBy"
                  className="w-52"
                  onChange={(e) => setOrderBy(e.target.value)}
                  value={orderBy || "id"}
                >
                  <option value="id">ID</option>
                  <option value="productName">Product Name</option>
                  <option value="createdAt">Date</option>
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <p className="w-24 text-right">Sort Order:</p>
                <select
                  id="orderByMethod"
                  name="orderByMethod"
                  className="w-52"
                  onChange={(e) => setSortDirection(e.target.value)}
                  value={sortDirection || "ASC"}
                >
                  <option value="ASC">ASC</option>
                  <option value="DESC">DESC</option>
                </select>
              </div>
              <div className="flex items-center space-x-4 w-full">
                <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => console.log(branchId)}
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Search
                </button>
              </div>
              </div>              
            </div>
        </PopoverFilter>
      </div>
      <Table tableData={dummyData} />
      <Pagination
        rowsOption={[5, 10, 20, 30]}
        handleChangeRow={handleChangeRowPerPage}
        rowPerPage={limit}
        page={page}
        handleChangePage={handleChangePage}
        totalPages={totalPages}
      />
      <Toaster />
    </div>
  );
}

export default ProductSalesReport;
