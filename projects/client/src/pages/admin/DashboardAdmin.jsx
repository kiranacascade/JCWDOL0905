import { useSelector } from "react-redux";
import Layout from "../../component/Layout";
import { Toaster } from "react-hot-toast";
import DashboardChart from "../../component/DashboardChart";

const DASHBOARD_TEXT_ROLE_MAPPING = {
  SUPER_ADMIN: "Dashboard Super Admin",
  BRANCH_ADMIN: "Dashboard Branch Admin",
};

const data = [
  {
    name: "January",
    sales: 4000,
  },
  {
    name: "February",
    sales: 3000,
  },
  {
    name: "March",
    sales: 2000,
  },
  {
    name: "April",
    sales: 2780,
  },
  {
    name: "May",
    sales: 1890,
  },
  {
    name: "June",
    sales: 2390,
  },
];

const plotConfig = [
  { key: "sales", color: "#8884d8" },
];

const DashboardAdmin = () => {
  const { role } = useSelector((state) => state.adminSlice);
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
                    1.000
                  </h1>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg">
                  <h1 className="text-lg font-semibold text-gray-900">
                    Total Sales
                  </h1>
                  <h1 className="text-xl font-semibold text-gray-900">
                    IDR 1.000.000.000
                  </h1>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg">
                  <h1 className="text-lg font-semibold text-gray-900">
                    Total Transactions
                  </h1>
                  <h1 className="text-xl font-semibold text-gray-900">
                    10.000
                  </h1>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Sales Overview
              </h1>
              <DashboardChart data={data} plotConfig={plotConfig} />
            </div>
          </div>
        </div>
      </main>
      <Toaster />
    </Layout>
  );
};

export default DashboardAdmin;
