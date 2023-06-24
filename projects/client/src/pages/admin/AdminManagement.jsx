import React, { useEffect } from "react";
import Layout from "../../component/Layout";
import Pagination from "../../component/PaginationRowPerPage";
import { useState } from "react";
import { api } from "../../api/api";
import ModalAdminBranch from "../../component/ModalAdminBranch";
import { Toaster } from "react-hot-toast";
import ModalEditAdminBranch from "../../component/ModalEditAdminBranch";

function Table({ tableData, setEditData, setOpenEditModal }) {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full table-auto divide-y divide-gray-300">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                  >
                    Admin Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Branch Store Name
                  </th>
                  <th
                    scope="col"
                    className="flex px-3 py-3 sm:pr-3 text-sm text-center items-center justify-center font-semibold text-gray-900"
                  >
                    {" "}
                    Actions{" "}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y text-left divide-gray-200 bg-white">
                {tableData.map((person) => (
                  <tr key={person.email}>
                    <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {person.id || ""}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                      {person.admin_name || ""}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                      {person.email || ""}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                      {person.role === "BRANCH_ADMIN" ? "BRANCH ADMIN" : person.role || ""}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                      {person.Store_Branch.branch_name || ""}
                    </td>
                    <td className="flex whitespace-nowrap px-3 py-3 text-center text-sm font-medium sm:pr-3 justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setEditData(person);
                          setOpenEditModal(true);
                        }}
                        className="inline-flex items-center justify-center rounded-md bg-blue-600 text-sm font-medium text-white shadow-sm hover:bg-blue-700 px-3 py-1"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="ml-5 inline-flex items-center justify-center rounded-md bg-red-600 text-sm font-medium text-white shadow-sm hover:bg-red-700 px-3 py-1"
                      >
                        Delete
                      </button>
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

function AdminManagement() {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [tableData, setTableData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const getListOfAdmin = async () => {
    try {
      const response = await api.get(`admins/branch-admin-list`, {
        params: {
          page: page,
          limit: limit,
          name: name,
        },
      });
      setTableData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListOfAdmin();
    const interval = setInterval(() => {
      getListOfAdmin();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [page, limit]);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 text-center justify-center">
            Branch Admin Management
          </h1>
        </div>
        <div className="mt-10 sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div>
              <input
                type="name"
                name="name"
                className="text-sm placeholder-gray-500 pl-5 pr-4 rounded-2xl border border-gray-400 w-300 py-2 focus:outline-none focus:border-green-400"
                placeholder="Enter name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                onClick={() => getListOfAdmin()}
                type="button"
                className="ml-5 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Search branch admin
              </button>
            </div>
          </div>
          <div className="mt-3 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add New Branch Admin
            </button>
          </div>
        </div>
        <Table
          tableData={tableData}
          setEditData={setEditData}
          setOpenEditModal={setOpenEditModal}
        />
        <Pagination
          rowsOption={[5, 20, 30]}
          handleChangeRow={setLimit}
          rowPerPage={limit}
          page={page}
          handleChangePage={setPage}
          totalPages={totalPages}
        />
      </div>
      <ModalAdminBranch
        open={open}
        setOpen={setOpen}
        editData={editData}
        setEditData={setEditData}
      />
      <ModalEditAdminBranch
        open={openEditModal}
        setOpen={setOpenEditModal}
        editData={editData}
        setEditData={setEditData}
      />
      <Toaster />
    </Layout>
  );
}

export default AdminManagement;
