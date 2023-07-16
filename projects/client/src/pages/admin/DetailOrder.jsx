import { api } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import pin from "../../assets/images/pin.png";
import Countdown from "react-countdown";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import CancelOrderModal from "../../component/CancelOrderModal";
import UploadPaymentModal from "../../component/UploadPaymentModal";
import AcceptPaymentModal from "../../component/AcceptPaymentModal";
import RejectPaymentModal from "../../component/RejectPaymentModal";
import ShipOrderModal from "../../component/ShipOrderModal";
import ShowImageFull from "../../component/ShowImageModal";
import Layout from "../../component/Layout";

export default function DetailOrder() {
  const id = useParams().id;
  const Navigate = useNavigate();
  const role = useSelector((state) => state.adminSlice.role);
  const id_branch = useSelector((state) => state.adminSlice.id_branch);
  const [carts, setCarts] = useState([]);
  const [order, setOrder] = useState({});
  const [detail, setDetail] = useState("");
  const [item, setItem] = useState([]);
  const [timer, setTimer] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`transaction/${id}`);
        const orderData = response.data.data;

        if(id_branch != orderData.id_branch && role != 'SUPER_ADMIN'){
          Navigate('/404')
        }

        try{
          const response = await api.get(`transaction/item/${id}`);
          const itemData = response.data.data;
          setItem(itemData)
        }catch(error){
          toast.error(error.response.data.message);
        }

        setDetail(`${orderData.address_label} - ${orderData.address_detail} - ${orderData.address_city} - ${orderData.address_province}`)
        setOrder(orderData);
      } catch (error) {
        toast.error(error.response.data.message);
        Navigate('/404')
      }
    }
    fetchData();
  }, []);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <>
        <Layout>
      {id_branch == order.id_branch || role == 'SUPER_ADMIN' &&
        <div>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="flex items-center">
                  <button onClick={()=>Navigate('/admin/orders')} class="font-medium flex-none mr-1">
                      <ChevronLeftIcon className="h-5 w-5 fill-white stroke-black stroke-2"/>
                  </button>
                  <strong className="text-lg font-bold sm:text-xl">Order Detail</strong>
              </div>

              <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                <section aria-labelledby="cart-heading" className="lg:col-span-7">
                  <h2 id="cart-heading" className="sr-only">
                    Items in cart
                  </h2>
                  
                  {order.order_status && <p>Status: <b>{order.order_status.toUpperCase()}</b></p> }
                    {order.order_status=='waiting for payment confirmation' &&
                        <div className="mt-5">
                            <div className="flex-shrink-0">
                            <img
                                src={order.payment_proof}
                                alt={"payment proof"}
                                className="h-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                            />
                            </div>
                            <div className="mt-3">
                                <ShowImageFull image={order.payment_proof}/>
                            </div>
                        </div>
                    }

                    {order.order_status=='waiting for payment confirmation' &&
                      <div className="mt-6 flex">
                        <AcceptPaymentModal id={id}/>
                        <RejectPaymentModal id={id}/>
                      </div>
                    }
                    {order.order_status=='processed' &&
                      <div className="mt-6 flex">
                        <ShipOrderModal id={id}/>
                      </div>
                    }                    

                  <p className="mt-5 font-bold">Item List</p>

                  <ul
                    role="list"
                    className="divide-y divide-gray-200 border-t border-b border-gray-200"
                  >
                    {item.map((data) => (
                      <li key={data.id} className="flex py-6 sm:py-10">
                        <div className="flex-shrink-0">
                          <img
                            src={data.product_image}
                            alt={data.product_name}
                            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <a
                                    href={"#"}
                                    className="font-medium text-gray-700 hover:text-gray-800"
                                  >
                                    {data.product_name}
                                  </a>
                                </h3>
                              </div>
                              <div className="mt-1 flex text-sm">
                                <p className="text-gray-500">{data.weight} gr/item</p>
                              </div>
                              <p className="mt-1 text-sm font-medium text-gray-900">
                                {rupiah(data.product_price)}
                              </p>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:pr-9"> 
                              <div class="flex items-center">
                                <div class="flex-none">
                                  x {data.product_qty}
                                </div>
                              </div>
                            </div>
                            {data.bonus_qty > 0 &&
                              <p className="mt-1 text-sm font-medium text-gray-900">
                                Bonus item: {data.bonus_qty} pcs
                              </p>
                            }
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                <section
                  aria-labelledby="summary-heading"
                  className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                >
                  <h2
                    id="summary-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Order Detail
                  </h2>

                  <dl className="mt-6 space-y-4">
                  <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                          Shipping Address
                      </label>
                      <div className="mt-1">
                          <p className="text-gray-600 sm:text-sm">{detail}</p>
                      </div>
                  </div>
                    
                    <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-600">Total Weight</dt>
                        <dd className="text-sm font-medium text-gray-900">{order.total_weight} gr</dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-600">Subtotal</dt>
                        <dd className="text-sm font-medium text-gray-900">{rupiah(order.total_price)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-600">Shipping Cost</dt>
                        <dd className="text-sm font-medium text-gray-900">{rupiah(order.shipping_fee)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-600">Voucher Discount</dt>
                        <dd className="text-sm font-medium text-gray-900">{rupiah(order.voucher_discount_amount)}</dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <dt className="text-base font-medium text-gray-900">
                        Final Price
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        {rupiah(order.final_price)}
                      </dd>
                    </div>
                    {(order.order_status=='waiting for payment' || order.order_status=='waiting for payment confirmation' || order.order_status=='processed') &&
                      <div className="mt-6 flex">
                        <CancelOrderModal id={id} admin={true}/>
                      </div>
                    }
                  </dl>
                </section>
              </form>
            </div>
            <Toaster />
          </div>
        </div>
      }
      </Layout>
    </>
  );
}
