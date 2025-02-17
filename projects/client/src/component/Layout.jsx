/* eslint-disable no-restricted-globals */
import { useState, useEffect, Fragment } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Transition } from "@headlessui/react";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != "undefined") {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar/>
      </Transition>
      <main
        className={`py-16 transition-all duration-[400ms] ${
          showNav && !isMobile ? "md:pl-56 lg:pl-56" : ""
        }`}
      >
{children}
      </main>
    </>
  );
}
