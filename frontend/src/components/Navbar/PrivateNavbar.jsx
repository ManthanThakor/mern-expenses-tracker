import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { SiAuthy } from "react-icons/si";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/slice/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const dispatch = useDispatch();
  const location = useLocation();

  const logoutHandler = () => {
    dispatch(logoutAction());
    localStorage.removeItem("userInfo");
  };

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
                  {[
                    "/",
                    "/add-transaction",
                    "/add-category",
                    "/categories",
                    "/profile",
                    "/dashboard",
                  ].map((path, idx) => (
                    <Link
                      key={idx}
                      to={path}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                        location.pathname === path
                          ? "border-b-2 border-indigo-500 text-white"
                          : "text-gray-300 hover:border-gray-500 hover:text-white"
                      }`}
                    >
                      {path === "/" && "MrTracker"}
                      {path === "/add-transaction" && "Add Transaction"}
                      {path === "/add-category" && "Add Category"}
                      {path === "/categories" && "Categories"}
                      {path === "/profile" && "Profile"}
                      {path === "/dashboard" && "Dashboard"}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={logoutHandler}
                  className="flex items-center px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <IoLogOutOutline
                    className="h-5 w-5 mr-2"
                    aria-hidden="true"
                  />
                  Logout
                </button>
                <div className="hidden md:flex md:items-center">
                  <Menu as="div" className="relative">
                    <Menu.Button className="flex rounded-full bg-gray-200 p-1 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard"
                              className={classNames(
                                active
                                  ? "bg-gray-700 text-white"
                                  : "text-gray-300",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              My Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logoutHandler}
                              className={classNames(
                                active
                                  ? "bg-gray-700 text-white"
                                  : "text-gray-300",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {[
                "/",
                "/add-transaction",
                "/add-category",
                "/categories",
                "/profile",
                "/dashboard",
              ].map((path, idx) => (
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
                  {path === "/" && "MrTracker"}
                  {path === "/add-transaction" && "Add Transaction"}
                  {path === "/add-category" && "Add Category"}
                  {path === "/categories" && "Categories"}
                  {path === "/profile" && "Profile"}
                  {path === "/dashboard" && "Dashboard"}
                </Disclosure.Button>
              ))}
              <div className="border-t border-gray-700 pt-2">
                <Disclosure.Button
                  as="button"
                  onClick={logoutHandler}
                  className="w-full px-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
