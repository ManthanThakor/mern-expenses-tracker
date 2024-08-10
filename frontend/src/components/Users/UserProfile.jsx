import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { updateProfileAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/slice/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    email: "",
    username: "",
  });

  useEffect(() => {
    // Load user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setInitialValues({
        email: storedUser.email,
        username: storedUser.username,
      });
    }
  }, []);

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: updateProfileAPI,
    mutationKey: ["update-profile"],
  });

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const data = await mutateAsync(values);
        console.log(data);
        // Update local storage and Redux state
        localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch(loginAction(data));
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("userInfo");
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h1 className="mb-2 text-2xl text-center font-extrabold">Welcome</h1>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Update Profile
      </h3>

      {isPending && <AlertMessage type="loading" message="Updating...." />}
      {isError && (
        <AlertMessage
          type="error"
          message={error.response?.data?.message || "An error occurred"}
        />
      )}
      {isSuccess && (
        <AlertMessage type="success" message="Updated successfully" />
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Username Field */}
        <div className="flex items-center space-x-4">
          <FaUserCircle className="text-3xl text-gray-400" />
          <div className="flex-1">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              {...formik.getFieldProps("username")}
              type="text"
              id="username"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your username"
            />
          </div>
          {formik.touched.username && formik.errors.username && (
            <span className="text-xs text-red-500">
              {formik.errors.username}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className="flex items-center space-x-4">
          <FaEnvelope className="text-3xl text-gray-400" />
          <div className="flex-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your email"
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <span className="text-xs text-red-500">{formik.errors.email}</span>
          )}
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
