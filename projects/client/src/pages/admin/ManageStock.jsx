import Layout from "../../component/Layout";
import { Toaster } from "react-hot-toast";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";


export const ManageStock = () => {

    return (
      <Layout>
        <div className="flex min-w-screen min-h-screen">
          <Toaster />
          <div className="flex mx-auto rounded-md w-full max-w-xl max-h-5xl px-2 bg-white md:w-full md:px-6 lg:w-full lg:max-w-7xl lg:h-7xl lg:px-4">
            <div className="w-full lg:w-full p-4 lg:p-8 justify-start ">
              <div className="flex justify-between items-center my-3 mb-8">
                <h2>Manage Stock</h2>
                <button
                  className="bg-green-600 h-10 px-4 md:px-8 lg:px-8 text-white font-semibold rounded-md"
                  // onClick={openAddModal}
                >
                  Add Product to Store
                </button>
              </div>

              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              {" "}
                              ID{" "}
                            </th>{" "}
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                            >
                              {" "}
                              Product{" "}
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                            >
                              {" "}
                              Discount{" "}
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                            >
                              {" "}
                              Price{" "}
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-sm font-semibold text-gray-900"
                            >
                              {" "}
                              Stock{" "}
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
                          <tr key={1}>
                            <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-900 sm:pl-6">
                              1
                            </td>
                            <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                            Apel Fuji Lorem Ipsum
                              {/* <div className="flex items-center">
                                <div className="w-24 mr-2">
                                <img
                                  src="http://localhost:8000/api/products/apel-fuji-1686113800439.jpg"
                                  alt="Apel"
                                  className="h-30 w-30 object-center sm:h-30 sm:w-30"
                                />
                                </div>
                                
                                <div className="font-medium"></div>
                              </div> */}
                            </td>
                            <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                            
                              buy one get one
                            </td>
                            <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                              Rp 28.000
                                <span className="ml-2 text-sm text-gray-400 line-through">
                                    Rp 25.000
                                </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                              30
                            </td>
                            <td className="flex whitespace-nowrap px-3 py-3 text-center text-sm font-medium sm:pr-3 justify-center">
                              <div className="flex row">
                                <PencilIcon
                                  className="h-5 w-5 fill-yellow-600 cursor-pointer mr-10"
                                  //   onClick={() => {
                                  //     setEditData(person);
                                  //     setOpenEditModal(true);
                                  //   }}
                                />
                                <TrashIcon
                                  className="h-5 w-5 fill-red-600 cursor-pointer"
                                  //   onClick={() => {
                                  //     setEditData(person);
                                  //     setOpenDeleteModal(true);
                                  //   }}
                                />
                              </div>
                            </td>
                          </tr>
                          {/* {tableData.map((person) => (
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
                      <div className="flex row">
                        <PencilIcon
                          className="h-5 w-5 fill-yellow-600 cursor-pointer mr-10"
                          onClick={() => {
                            setEditData(person);
                            setOpenEditModal(true);
                          }}
                        />
                        <TrashIcon
                          className="h-5 w-5 fill-red-600 cursor-pointer"
                          onClick={() => {
                            setEditData(person);
                            setOpenDeleteModal(true);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))} */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          {/* {addModalOpen && (
        <AddDiscountModal
          open={addModalOpen}
          setOpen={setAddModalOpen}
          cancelButtonRef={null}
          onClose={closeAddModal}
        />
      )} */}
        </div>
      </Layout>
    );
}