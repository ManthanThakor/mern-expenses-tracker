export const getUserFromStorage = () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    return storedUser?.token || null;
  } catch (error) {
    console.error("Error retrieving user token from storage:", error);
    return null;
  }
};
