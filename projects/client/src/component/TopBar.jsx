import { Fragment } from "react";
import {
  Bars3CenterLeftIcon,
  PencilIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
// import Link from "next/link";

export default function TopBar({ showNav, setShowNav }) {
  const username = typeof window !== "undefined" ? localStorage.getItem("username") : null;
  return (
    <div
      className={`fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="pl-4 md:pl-16">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
    </div>
  );
}
