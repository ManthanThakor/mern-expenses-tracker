import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { SiAuthy } from "react-icons/si";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function PublicNavbar() {
  const location = useLocation();

  return (
    <Disclosure as="nav" className="bg-gray-800 shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0">
                  <SiAuthy className="h-8 w-auto text-green-400" />
                </div>
                <div className="hidden md:flex md:space-x-8">
                  {["/", "/register", "/login"].map((path, idx) => (
                    <Link
                      key={idx}
                      to={path}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                        location.pathname === path
                          ? "border-b-2 border-indigo-500 text-white"
                          : "text-gray-300 hover:border-gray-500 hover:text-white"
                      }`}
                    >
                      {path === "/" && "MasyncTracker"}
                      {path === "/register" && "Register"}
                      {path === "/login" && "Login"}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/register"
                  className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaRegUser className="h-5 w-5 mr-2" aria-hidden="true" />
                  Register
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <RiLoginCircleLine
                    className="h-5 w-5 mr-2"
                    aria-hidden="true"
                  />
                  Login
                </Link>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {["/", "/register", "/login"].map((path, idx) => (
                <Disclosure.Button
                  key={idx}
                  as={Link}
                  to={path}
                  className={`block px-4 py-2 text-base font-medium ${
                    location.pathname === path
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {path === "/" && "MasyncTracker"}
                  {path === "/register" && "Register"}
                  {path === "/login" && "Login"}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
