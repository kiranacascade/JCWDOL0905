import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useEffect } from "react";
import { api } from "../api/api";
import toast from "react-hot-toast";

export default function UpdateStockModal({ open, setOpen, onClose, product, categories, inventory}) {
  const [modalOpen, setModalOpen] = useState(open);
  const token = localStorage.getItem("token_admin");
  const cancelButtonRef = useRef(null);

  const editStockSchema = Yup.object().shape({
    stock: Yup.number("Stock must be a number")
      .positive("Stock must be a positive number")
      .integer("Stock must be an integer"),
  });

  useEffect(() => {
    setModalOpen(open);
    console.log("inventory", inventory)
  }, [open]);

  const handleClose = () => {
    setModalOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const editProduct = async (values) => {
    try {
    //   const fileInput = document.getElementById("image");
    //   const file = fileInput.files[0];

    //   const formData = new FormData();
    //   formData.append("product_name",values.product_name);
    //   formData.append("id_category",values.id_category);
    //   formData.append("product_description",values.product_description);
    //   formData.append("product_price",values.product_price);
    //   formData.append("weight",values.weight);
    //   formData.append("image", file);

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await api.patch(`/inventory/${inventory.id}`, values, config);
      toast.success(response.data.message);
      window.location.reload();
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={{ product_name: inventory?.Product?.product_name || "", stock: inventory?.stock }}
      validationSchema={editStockSchema}
      onSubmit={(values) => editProduct(values)}
    >
      {(props) => {
        // console.log(props);
        return (
          <>
            <Transition.Root show={modalOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
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
                      show={open}
                    >
                      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <Form>
                          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <Dialog.Title
                                  as="h3"
                                  className="text-lg font-semibold leading-6 text-gray-900"
                                >
                                  Update Stock
                                </Dialog.Title>
                                <div className="mt-8 mb-4 w-96">
                                  {/* <Form> */}
                                  <Field name="product_name">
                                    {({ field, form }) => (
                                      <div>
                                        <label
                                          htmlFor="product_name"
                                          className="block text-md font-medium leading-6 text-gray-900"
                                        >
                                          Product Name
                                        </label>
                                        <div className="my-2">
                                          <input
                                            {...field} id="product_name" type="text" disabled className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 disabled:opacity-60 ${
                                              form.errors.product_name &&
                                              form.touched.product_name
                                                ? "ring-2 ring-red-600"
                                                : ""
                                            }`}
                                          />
                                          <ErrorMessage
                                            component="div"
                                            name="product_name"
                                            className="text-red-500 text-sm mt-1"
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </Field>
                                  
                                
                                  <Field name="stock">
                                    {({ field, form }) => (
                                      <div className="">
                                        <label
                                          htmlFor="stock"
                                          className="block text-md font-medium leading-6 text-gray-900"
                                        >
                                          Price
                                        </label>
                                        <div className="my-2">
                                          <div className="relative">
                                            <input
                                              {...field}
                                              id="stock" type="number" 
                                              className={`block w-full rounded-md border-0 px-2 pt-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 ${
                                                form.errors.stock &&
                                                form.touched.stock
                                                  ? "ring-2 ring-red-600"
                                                  : ""
                                              }`}
                                            />
                                          </div>
                                          <ErrorMessage
                                            name="stock"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </Field>

                                  
                                  {/* </Form> */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 sm:ml-3 sm:w-auto"
                            >
                              Submit
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={handleClose}
                              ref={cancelButtonRef}
                            >
                              Cancel
                            </button>
                          </div>
                        </Form>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          </>
        );
      }}
    </Formik>
  );
}