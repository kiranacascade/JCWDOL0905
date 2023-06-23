import { useSelector, useDispatch } from 'react-redux'
import { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Bars3Icon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react'
import logo_groceria from "../../assets/images/logo-brand-groceria.png"
import { logoutAdmin } from '../../redux/adminSlice'
import Layout from '../../component/Layout';

const DashboardAdmin = () => {
  const { role } = useSelector((state) => state.adminSlice);
  let dashboardText = '';
  if (role === 'SUPER_ADMIN') {
    dashboardText = 'Dashboard Super Admin';
  } else if (role === 'BRANCH_ADMIN') {
    dashboardText = 'Dashboard Branch Admin';
  }

  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/Dashboard', icon: HomeIcon, current: true },
    { name: 'User', href: '/User', icon: HomeIcon, current: false },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  function Logout(){
    dispatch(logoutAdmin());
    localStorage.clear();
    setTimeout(() => {Navigate('/login-admin')}, 1000);
}

  return (
    <Layout>
      <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900"> {dashboardText} </h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with content */}
                <div className="py-4">
                  <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
    </Layout>
  );
};

export default DashboardAdmin;
