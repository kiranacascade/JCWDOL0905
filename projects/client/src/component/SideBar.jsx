import { forwardRef } from "react";
import { HomeIcon, UserIcon,ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import logo_groceria from "../assets/images/logo-brand-groceria.png"
import { useSelector, useDispatch  } from "react-redux";
import { logoutAdmin } from '../redux/adminSlice'
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: 'Admin Management', href: '/admin/admin-management', icon: HomeIcon, current: true, roleAccess: ["SUPER_ADMIN"] },
  { name: 'Branch Management', href: '/admin/branch-management', icon: UserIcon, current: false, roleAccess: ["SUPER_ADMIN"]},
  { name: 'Sales Report', href: '/admin/sales-report', icon: HomeIcon, current: true, roleAccess: ["BRANCH_ADMIN", "SUPER_ADMIN"] },
  { name: 'Product Management', href: '/admin/product-management', icon: UserIcon, current: false, roleAccess: ["BRANCH_ADMIN"]},
  { name: 'Orders', href: '/admin/orders', icon: HomeIcon, current: true, roleAccess: ["BRANCH_ADMIN"] },
  { name: 'Product Stock History', href: '/admin/product-stock-history', icon: UserIcon, current: false, roleAccess: ["BRANCH_ADMIN"]},
]

const SideBar = forwardRef((props, ref) => {
  const { role } = useSelector((state) => state.adminSlice);

  const dispatch = useDispatch()
  const Navigate = useNavigate()

function Logout(){
  dispatch(logoutAdmin());
  localStorage.clear();
  setTimeout(() => {Navigate('/login-admin')}, 1000);
}

  return (
    <div ref={ref} className="fixed w-56 h-full bg-gray-900 shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img
            className="w-32 h-auto"
            src={logo_groceria}
            alt="company logo"
          />
        </picture>
      </div>

      <div className="flex flex-col">
      {navigation.map((data, index) => {
          // Check if the user's role is included in the roleAccess array
          if (data.roleAccess.includes(role)) {
            return (
              <a href={data.href} key={index}>
                <div
                  className={`p-5 mx-5 rounded text-left cursor-pointer mb-3 flex items-center transition-colors ${"bg-white text-green-500"}`}
                >
                  <div className="mr-2">
                    <data.icon className="h-5 w-5" />
                  </div>
                  <div>{data.name}</div>
                </div>
              </a>
            );
          }
          return null; // If the user's role is not included, render nothing
        })}
      </div>

      <div className="flex flex-col mt-auto">
        <button
          onClick={Logout}
          className="p-5 mx-5 rounded text-left cursor-pointer mb-3 flex items-center transition-colors bg-white text-green-600"
        >
          <div className="mr-2">
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          </div>
          <div>Logout</div>
        </button>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
