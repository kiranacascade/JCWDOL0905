import { useSelector } from "react-redux";
import Layout from "../../component/Layout";
import { Toaster } from "react-hot-toast";
import DashboardChart from "../../component/DashboardChart";
import { api } from "../../api/api";
import { useEffect, useState } from "react";

const DASHBOARD_TEXT_ROLE_MAPPING = {
  SUPER_ADMIN: "Dashboard Super Admin",
  BRANCH_ADMIN: "Dashboard Branch Admin",
};

const plotConfig = [{ key: "totalSales", color: "#8884d8" }];

const DashboardAdmin = () => {
  const { role } = useSelector((state) => state.adminSlice);

  const [dashboardData, setDashboardData] = useState({});

  const getDashboardData = async () => {
    try {
      const response = await api.get(`admins/dashboard-data`);
      setDashboardData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <Layout>
      <main className="flex-1">
        <div className="py-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              {DASHBOARD_TEXT_ROLE_MAPPING[role]}
            </h1>
            <div className="flex justify-center">
              <div className="text-center justify-center py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <h1 className="text-lg font-semibold text-gray-900">
                    Total Users
                  </h1>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {dashboardData.totalUser || ""}
                  </h1>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg">
                  <h1 className="text-lg font-semibold text-gray-900">
                    Total Sales
                  </h1>
                  <h1 className="text-xl font-semibold text-gray-900">
                    IDR  {dashboardData.totalSales || ""}
                  </h1>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg">
                  <h1 className="text-lg font-semibold text-gray-900">
                    Total Transactions
                  </h1>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {dashboardData.totalTransactions || ""}
                  </h1>
                </div>
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
