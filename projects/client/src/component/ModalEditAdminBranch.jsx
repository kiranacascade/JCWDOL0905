import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { api } from "../api/api";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ModalEditAdminBranch({ open, setOpen, setEditData, editData }) {
  const [storeData, setStoreData] = useState([]);
  const [adminName, setAdminName] = useState(editData.admin_name || "");
  const [adminEmail, setAdminEmail] = useState(editData.email || "");
  const [adminPassword, setAdminPassword] = useState("");
  const [branchId, setBranchId] = useState(editData.id_branch || "");

  const Navigate = useNavigate();

  const postCreateBranchAdmin = async () => {
    try {
      const response = await api.put(`admins/edit-admin/${editData.id}`, {
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        branchId: branchId
      });
      toast.success(response.data.message);
      setTimeout(() => {
        setOpen(false);
        setAdminName('')
        setAdminEmail('')
        setAdminPassword('')
        setBranchId('')
        setEditData({})
      }, 1500);
      setTimeout(() => {Navigate('/admin/admin-management')}, 1000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getListOfStoreData = async () => {
    try {
      const response = await api.get(`branch`);
      setStoreData(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getListOfStoreData();
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Edit branch admin
                    </Dialog.Title>
                    <div className="mt-2">
                      <input
                        onChange={(e) => setAdminName(e.target.value)}
                        value={adminName}
                        id="adminName"
                        name="adminName"
                        placeholder="Enter Admin Name"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        onChange={(e) => setAdminEmail(e.target.value)}
                        value={adminEmail}
                        id="adminEmail"
                        name="adminEmail"
                        placeholder="Enter Admin Email"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        onChange={(e) => setAdminPassword(e.target.value)}
                        value={adminPassword}
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="location"
                        className="block text-sm text-left font-medium text-gray-700"
                      >
                        Store ID
                      </label>
                      <select
                        id="storeId"
                        name="storeId"
                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setBranchId(e.target.value)}
                        value={branchId || ""}
                      >
                        <option value="">Select store</option>
                        {storeData.map((data, index) => (
                          <option key={index} value={data.id}>
                            {data.branch_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex">
                  <button
                    disabled={
                      adminName === "" ||
                      adminEmail === "" ||
                      adminPassword === "" ||
                      branchId === ""
                    }
                    type="button"
                    className="mr-2 inline-flex w-full justify-center rounded-md border border-transparent disabled:bg-green-800 bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => {
                        postCreateBranchAdmin()
                    }}
                  >
                    Edit Admin
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
