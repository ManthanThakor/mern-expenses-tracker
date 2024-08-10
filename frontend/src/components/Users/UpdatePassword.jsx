import React from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { changePasswordAPI } from "../../services/users/userService";
import { logoutAction } from "../../redux/slice/authSlice";
import AlertMessage from "../Alert/AlertMessage";

// Validation schema for the password change form
const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("New Password is required"),
});

const UpdatePassword = () => {
  const dispatch = useDispatch();

  // Mutation for changing password
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: changePasswordAPI,
    mutationKey: ["change-password"],
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await mutateAsync({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        });
        // Logout user after password change
        dispatch(logoutAction());
        localStorage.removeItem("userInfo");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Change Password
      </h3>

      {/* Display alert messages */}
      {isPending && (
        <AlertMessage type="loading" message="Changing password...." />
      )}
      {isError && (
        <AlertMessage
          type="error"
          message={error.response?.data?.message || "An error occurred"}
        />
      )}
      {isSuccess && (
        <AlertMessage
          type="success"
          message="Password changed successfully. Please log in again."
        />
      )}

      {/* Password change form */}
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Old Password Field */}
        <div className="flex items-center space-x-4">
          <AiOutlineLock className="text-3xl text-gray-400" />
          <div className="flex-1">
            <label
              htmlFor="oldPassword"
              className="text-sm font-medium text-gray-700"
            >
              Old Password
            </label>
            <input
              {...formik.getFieldProps("oldPassword")}
              type="password"
              id="oldPassword"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your old password"
            />
          </div>
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <span className="text-xs text-red-500">
              {formik.errors.oldPassword}
            </span>
          )}
        </div>

        {/* New Password Field */}
        <div className="flex items-center space-x-4">
          <AiOutlineLock className="text-3xl text-gray-400" />
          <div className="flex-1">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              {...formik.getFieldProps("newPassword")}
              type="password"
              id="newPassword"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your new password"
            />
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <span className="text-xs text-red-500">
              {formik.errors.newPassword}
            </span>
          )}
        </div>

        {/* Change Password Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
