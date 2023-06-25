import { forwardRef } from "react";
import { HomeIcon, UserIcon, ArrowLeftOnRectangleIcon, DocumentChartBarIcon, UsersIcon, BuildingStorefrontIcon, RectangleGroupIcon, ShoppingCartIcon, ReceiptPercentIcon, ClipboardDocumentCheckIcon, InboxStackIcon } from "@heroicons/react/24/solid";
import logo_groceria from "../assets/images/logo-brand-groceria.png"
import { useSelector, useDispatch  } from "react-redux";
import { logoutAdmin } from '../redux/adminSlice'
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: DocumentChartBarIcon, current: true, roleAccess: ["SUPER_ADMIN", "BRANCH_ADMIN"] },
  { name: 'Admin Profile', href: '/admin/admin-profile', icon: UserIcon, current: false, roleAccess: ["SUPER_ADMIN", "BRANCH_ADMIN"] },
  { name: 'Branch Store Management', href: '/admin/branch-management', icon: BuildingStorefrontIcon, current: false, roleAccess: ["SUPER_ADMIN"]},
  { name: 'Branch Admin Management', href: '/admin/admin-management', icon: UsersIcon, current: false, roleAccess: ["SUPER_ADMIN"] },
  { name: 'Product Management', href: '/admin/product-management', icon: RectangleGroupIcon, current: false, roleAccess: ["SUPER_ADMIN", "BRANCH_ADMIN"]},
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCartIcon, current: false, roleAccess: ["SUPER_ADMIN", "BRANCH_ADMIN"] },
  { name: 'Discount Management', href: '/admin/discount-management', icon: ReceiptPercentIcon, current: false, roleAccess: ["SUPER_ADMIN", "BRANCH_ADMIN"] },
  { name: 'Sales Report', href: '/admin/sales-report', icon: ClipboardDocumentCheckIcon, current: false, roleAccess: ["BRANCH_ADMIN", "SUPER_ADMIN"] },
  { name: 'Product Stock History', href: '/admin/product-stock-history', icon: InboxStackIcon, current: false, roleAccess: ["BRANCH_ADMIN"]},
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

const pathname = window.location.pathname

  return (
    <div ref={ref} className="fixed w-56 h-full bg-gray-800 text-gray-300 shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img
            className="w-32 h-auto"
            src={logo_groceria}
            alt="company logo"
          />
        </picture>
      </div>

      <div className="flex flex-col flex-grow">
      {navigation.map((data, index) => {
          // Check if the user's role is included in the roleAccess array
          if (data.roleAccess.includes(role)) {
            return (
              <a href={data.href} key={index}>
                <div
                  className={`p-1 mx-5 rounded text-left text-sm font-medium cursor-pointer mb-3 flex items-center transition-colors ${pathname === data.href ? 'bg-gray-700 text-white' : 'bg-gray-800 hover:bg-gray-700 hover:text-white'}`}
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
      <div className="mt-5 mb-5 mx-5 absolute bottom-0">
        <button
          onClick={Logout}
          className="p-2 rounded text-center cursor-pointer flex items-center justify-center transition-colors bg-gray-800 hover:bg-gray-700 hover:text-white text-sm font-bold w-full h-full"
        
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
