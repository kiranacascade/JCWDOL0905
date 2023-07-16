import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useEffect } from "react";
import { api } from "../../api/api";
import toast from "react-hot-toast";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProductSelector from "../ProductSelector";

export default function AddDiscountModal({ open, setOpen, onClose, selectedBranchId, fetchDiscounts}) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState({})
  const [selectedDiscountType, setSelectedDiscountType] = useState("percentage");
  const [selectedStartDate, setSelectedStartDate] = useState(null); 
  const [selectedEndDate, setSelectedEndDate] = useState(null); 
  const [inventories, setInventories] = useState([]);
  const [discountValue, setDiscountValue] = useState("");
  const [errorValue, setErrorValue] = useState();
  const [modalOpen, setModalOpen] = useState(open);
  const token = localStorage.getItem("token_admin");
  const cancelButtonRef = useRef(null);

  let validateValue = (value) => {
    if (value === "" && selectedDiscountType === "amount") {
      setErrorValue("Please input discount value");
    } else if (value === "" && selectedDiscountType === "percentage") {
      setErrorValue("Please input discount value");
    }  else if (!Number.isInteger(Number(value))) {
      setErrorValue("Discount value must be an integer");
    } else if (value < 1) {
      setErrorValue("Discount value must be at least 1");
    } else if (selectedDiscountType === "percentage" && value > 100 ){
      setErrorValue(`Value can't be more than 100`);
    } else if (selectedDiscountType === "amount" && value >= selectedProduct.price ){
      setErrorValue(`Value should be lower than product's price`);
    } else {
      setErrorValue("")
    }
    setDiscountValue(value)
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await api.get("/category");
        setCategories(categoriesData.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategories();

    async function fetchInventories() {
      try {
        const inventoriesData = await api.get(`/inventory/?category=${selectedCategory}&branchId=${selectedBranchId}`);
        // console.log(inventoriesData)
        setInventories(inventoriesData.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchInventories();

    setModalOpen(open);
  }, [open, selectedCategory, selectedDiscountType]);

  const handleClose = () => {
    setModalOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const createDiscount = async () => {
    try {
      const data = {
        id_inventory: selectedProduct.value,
        discount_type: selectedDiscountType,
        discount_value: selectedDiscountType === "buy one get one" ? null : discountValue,
        start_date: document.getElementById("start_date").value,
        end_date: document.getElementById("end_date").value,
      };

      console.log(data)
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await api.post("/discount/", data, config);
      toast.success(response.data.message);
      fetchDiscounts()
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const selectDiscountType = (type) => {
    if (type === "buy one get one") {
    setSelectedDiscountType(type)
    setDiscountValue(""); 
    setErrorValue(""); 
    }
    setSelectedDiscountType(type)
  }

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };
  return (
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
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900"
                      >
                        Create Discount
                      </Dialog.Title>
                      <div className="mt-8 mb-4 w-96">
                        <form className="" action="#" method="POST">
                          <div>
                            <label className="block text-md font-medium leading-6 text-gray-900">
                              Product Category
                            </label>
                            <div className="my-2">
                              <select
                                className="w-full rounded-md border border-gray-200 focus:ring-2 focus:ring-inset focus:ring-green-600 active:border-green-500 hover:border-green-500 target:border-green-500"
                                id="category"
                                required
                                onChange={(e) =>
                                  setSelectedCategory(e.target.value)
                                }
                              >
                                {categories.map((category) => (
                                  <option key={category.id} value={category.id}>
                                    {category.category_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                            <ProductSelector inventories={inventories} selectedCategory={selectedCategory} onProductSelect={handleProductSelect}
                            value={selectedProduct} />
                          

                          <div className="flex">
                            <div className="mr-2">
                              <label className="block text-md font-medium leading-6 text-gray-900">
                                Discount Type
                              </label>
                              <div className="my-2">
                                <select
                                  className="rounded-md border border-gray-200 focus:ring-2 focus:ring-inset focus:ring-green-600 active:border-green-500 hover:border-green-500 target:border-green-500"
                                  id="discount_type"
                                  required
                                  onChange={(e) =>
                                    selectDiscountType(e.target.value)
                                  }
                                >
                                  <option value="percentage">Percentage</option>
                                  <option value="amount">Amount</option>
                                  <option value="buy one get one">
                                    Buy One Get One
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div className="ml-2">
                              <label className="block text-md font-medium leading-6 text-gray-900">
                                Discount Value
                              </label>
                              <div className="my-2">
                                <div className="relative">
                                  {selectedDiscountType === "amount" && (
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                      <span className="text-gray-500 sm:text-sm">
                                        Rp
                                      </span>
                                    </div>
                                  )}
                                  <input
                                    id="discount_value"
                                    value={discountValue}
                                    type="number"
                                    disabled={
                                      selectedDiscountType === "buy one get one"
                                    }
                                    className={` w-full block rounded-md border-0 px-2 py-1.5 ${
                                      selectedDiscountType === "amount"
                                        ? "pl-9"
                                        : "pr-8"
                                    } text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 disabled:bg-gray-100 required:ring-red-500 placeholder:italic placeholder:text-sm ${
                                      errorValue ? "focus:ring-red-500" : ""
                                    }`}
                                    onChange={(e) =>
                                      validateValue(e.target.value)
                                    }
                                    placeholder={
                                      selectedDiscountType === 'buy one get one'
                                        ? ''
                                        : 'input value (required)'
                                    }
                                  />
                                  {selectedDiscountType === "percentage" && (
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                      <span
                                        className="text-gray-500 sm:text-sm"
                                        id="price-currency"
                                      >
                                        %
                                      </span>
                                    </div>
                                  )}
                                </div>
                                {errorValue && (
                                  <div className="text-red-700 text-sm font-semibold mt-1">
                                    {errorValue ? errorValue : ""}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex">
                            <div className="mr-2">
                              <div className="flex items-center justify-between">
                                <label className="block text-md font-medium leading-6 text-gray-900">
                                  Start Date
                                </label>
                              </div>
                              <div className="mt-2">
                                <Datepicker
                                  selected={selectedStartDate}
                                  className="block w-full mr-2 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-md sm:leading-6 placeholder:italic placeholder:text-sm"
                                  id="start_date"
                                  minDate={new Date()}
                                  onChange={(date) =>
                                    setSelectedStartDate(date)
                                  }
                                  placeholderText="select date (required)"
                                />
                              </div>
                            </div>
                            <div className="ml-2">
                              <div className="flex items-center justify-between">
                                <label className="block text-md font-medium leading-6 text-gray-900">
                                  End Date
                                </label>
                              </div>
                              <div className="mt-2">
                                <Datepicker
                                  selected={selectedEndDate}
                                  className="block w-full mr-2 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 placeholder:text-gray-400 focus:ring-inset focus:ring-green-600 sm:text-md sm:leading-6 placeholder:italic placeholder:text-sm"
                                  id="end_date"
                                  placeholderText="select date (required)"
                                  minDate={
                                    selectedStartDate
                                      ? new Date(
                                          selectedStartDate.getTime() +
                                            24 * 60 * 60 * 1000
                                        )
                                      : new Date()
                                  }
                                  onChange={(date) => setSelectedEndDate(date)}
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    onClick={createDiscount}
                    disabled={ !selectedProduct ||
                      !selectedStartDate || !selectedEndDate || errorValue
                    }
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 sm:ml-3 sm:w-auto disabled:opacity-60"
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
