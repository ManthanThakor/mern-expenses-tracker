import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaEdit, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import {
  updateProfileAPI,
  changePasswordAPI,
  fetchUserProfileAPI,
} from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/slice/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState({
    email: "",
    username: "",
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    // Fetch user data from the server
    const fetchData = async () => {
      const userData = await fetchUserProfileAPI();
      setInitialValues({
        email: userData.email,
        username: userData.username,
        oldPassword: "",
        newPassword: "",
      });
    };
    fetchData();
  }, []);

  const updateProfileMutation = useMutation(updateProfileAPI);
  const changePasswordMutation = useMutation(changePasswordAPI);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        // Handle profile update
        if (isEditing) {
          await updateProfileMutation.mutateAsync(values);
        }

        // Handle password change
        if (values.oldPassword && values.newPassword) {
          await changePasswordMutation.mutateAsync({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
          });
        }

        setIsEditing(false);
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
    <div className="max-w-4xl mx-auto my-10 p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-xl animate-fadeIn">
      <h1 className="mb-4 text-3xl text-center font-extrabold">User Profile</h1>

      {updateProfileMutation.isPending && (
        <AlertMessage type="loading" message="Updating profile..." />
      )}
      {updateProfileMutation.isError && (
        <AlertMessage
          type="error"
          message={
            updateProfileMutation.error?.response?.data?.message ||
            "An error occurred"
          }
        />
      )}
      {updateProfileMutation.isSuccess && (
        <AlertMessage type="success" message="Profile updated successfully!" />
      )}

      {changePasswordMutation.isPending && (
        <AlertMessage type="loading" message="Changing password..." />
      )}
      {changePasswordMutation.isError && (
        <AlertMessage
          type="error"
          message={
            changePasswordMutation.error?.response?.data?.message ||
            "An error occurred"
          }
        />
      )}
      {changePasswordMutation.isSuccess && (
        <AlertMessage type="success" message="Password changed successfully!" />
      )}

      <div className="space-y-6">
        {/* Profile Information */}
        {!isEditing && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaUserCircle className="text-4xl" />
              <div>
                <p className="text-xl font-semibold">
                  {initialValues.username}
                </p>
                <p className="text-md text-gray-200">{initialValues.email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
            >
              <FaEdit className="inline-block mr-2" />
              Edit Profile
            </button>
          </div>
        )}

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="flex items-center space-x-4">
              <FaUserCircle className="text-3xl text-gray-200" />
              <div className="flex-1">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-300"
                >
                  Username
                </label>
                <input
                  {...formik.getFieldProps("username")}
                  type="text"
                  id="username"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              <FaEnvelope className="text-3xl text-gray-200" />
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...formik.getFieldProps("email")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your email"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <span className="text-xs text-red-500">
                  {formik.errors.email}
                </span>
              )}
            </div>

            {/* Password Fields */}
            <div className="flex items-center space-x-4">
              <FaLock className="text-3xl text-gray-200" />
              <div className="flex-1">
                <label
                  htmlFor="oldPassword"
                  className="text-sm font-medium text-gray-300"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  {...formik.getFieldProps("oldPassword")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Old password"
                />
              </div>
              {formik.touched.oldPassword && formik.errors.oldPassword && (
                <span className="text-xs text-red-500">
                  {formik.errors.oldPassword}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <FaLock className="text-3xl text-gray-200" />
              <div className="flex-1">
                <label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-gray-300"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  {...formik.getFieldProps("newPassword")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="New password"
                />
              </div>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <span className="text-xs text-red-500">
                  {formik.errors.newPassword}
                </span>
              )}
            </div>

            {/* Save Changes Button */}
            <div className="flex justify-end mt-6 space-x-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-transform hover:scale-105"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Logout Button */}
        {!isEditing && (
          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
