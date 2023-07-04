import React from "react";
import Layout from "../../component/Layout";
import { Toaster } from "react-hot-toast";
import Tabs from "../../component/Tabs";
import ProductSalesReport from "../../component/salesReport/ProductSalesReport";


const tabs = [
    { name: "Products", index: 1, component: <ProductSalesReport/> },
    { name: "Transactions", index: 2, component: <p>Transactions</p> },
    { name: "Users", index: 3, component: <p>Users</p> },
  ];

function SalesReport() {
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-xl font-semibold text-gray-900 text-center justify-center">
          Sales Report
        </h1>
        <Tabs tabs={tabs} />
      <Toaster />
      </div>
    </Layout>
  );
}

export default SalesReport;
