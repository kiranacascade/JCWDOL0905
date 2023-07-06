import { useSelector } from "react-redux";
import Layout from "../../component/Layout";
import { Toaster, toast } from "react-hot-toast";
import DashboardChart from "../../component/DashboardChart";
import { api } from "../../api/api";
import { useEffect, useState } from "react";
import { ROLE } from "../../constant/role";
import { UsersIcon, BanknotesIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

const DASHBOARD_TEXT_ROLE_MAPPING = {
  SUPER_ADMIN: "Dashboard Super Admin",
  BRANCH_ADMIN: "Dashboard Branch Admin",
};

const plotConfig = [{ key: "totalSales", color: "#8884d8" }];

const DashboardAdmin = () => {
  const [branchId, setBranchId] = useState("All");
  const [storeData, setStoreData] = useState([]);
  const [dashboardData, setDashboardData] = useState({});
  const { id_branch, role } = useSelector((state) => state.adminSlice);

  const renderSearchByBranch = () => {
    return role === ROLE.SUPER_ADMIN ? (
      <>
        <div className="mt-2">
          <label
            htmlFor="location"
            className="block text-sm text-left font-medium text-gray-700"
          >
            {" "} Filter by Branch Store {" "}
          </label>
          <div className="flex items-center space-x-4">
            <select
              id="storeId"
              name="storeId"
              className="w-100"
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
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleSearchDashboard(branchId)}
            >
              Search
            </button>
          </div>
        </div>
      </>
    ) : null;
  };

  const getListOfStoreData = async () => {
    try {
      const response = await api.get(`branch`);
      setStoreData(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getDashboardData = async () => {
    try {
      const response = await api.get(`admins/dashboard-data`);
      setDashboardData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDashboardDataById = async (id) => {
    try {
      const response = await api.get(`admins/dashboard-data/${id}`);
      setDashboardData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchDashboard = (branchId) => {
    console.log(branchId, "this is branch id");
    if (branchId !== "All") {
      getDashboardDataById(branchId);
    } else {
      getDashboardData();
    }
  };

  useEffect(() => {
    console.log(role, id_branch);
    getListOfStoreData();
    if (role === ROLE.SUPER_ADMIN) {
      handleSearchDashboard("All");
    } else {
      setBranchId(id_branch);
      handleSearchDashboard(id_branch);
    }
  }, [id_branch]);

  return (
    <Layout>
      <main className="flex-1">
        <div className="py-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              {DASHBOARD_TEXT_ROLE_MAPPING[role]}
            </h1>
            {renderSearchByBranch()}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="relative overflow-hidden rounded-lg bg-gray-800 px-4 py-5 shadow sm:px-6 sm:py-6">
                <dt>
                  <div className="absolute rounded-md bg-indigo-500 p-3">
                    <UsersIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="ml-8 truncate justify-center text-sm font-medium text-gray-300">
                    Total Users
                  </p>
                </dt>
                <dd className="ml-8 flex justify-center items-baseline">
                  <p className="text-2xl font-semibold text-white">
                    {dashboardData.totalUser || ""}
                  </p>
                </dd>
              </div>
              <div className="relative overflow-hidden rounded-lg bg-gray-800 px-4 py-5 shadow sm:px-6 sm:py-6">
                <dt>
                  <div className="absolute rounded-md bg-indigo-500 p-3">
                    <BanknotesIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="ml-8 truncate justify-center text-sm font-medium text-gray-300">
                    Total Sales
                  </p>
                </dt>
                <dd className="ml-8 flex justify-center items-baseline">
                  <p className="text-2xl font-semibold text-white">
                    IDR {"   "}
                    {dashboardData.totalSales
                      ? dashboardData.totalSales.toLocaleString("id", {
                          useGrouping: true,
                        })
                      : ""}
                  </p>
                </dd>
              </div>
              <div className="relative overflow-hidden rounded-lg bg-gray-800 px-4 py-5 shadow sm:px-6 sm:py-6">
                <dt>
                  <div className="absolute rounded-md bg-indigo-500 p-3">
                    <ShoppingBagIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="ml-8 truncate justify-center text-sm font-medium text-gray-300">
                    Total Transactions
                  </p>
                </dt>
                <dd className="ml-8 flex justify-center items-baseline">
                  <p className="text-2xl font-semibold text-white">
                    {dashboardData.totalTransactions || ""}
                  </p>
                </dd>
              </div>
            </div>
            <div className="mt-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Sales Overview
              </h1>
              <DashboardChart
                data={dashboardData.totalSalesResult}
                plotConfig={plotConfig}
                maxY={dashboardData.maxMonthlySales || 100}
              />
            </div>
          </div>
        </div>
      </main>
      <Toaster />
    </Layout>
  );
};

export default DashboardAdmin;