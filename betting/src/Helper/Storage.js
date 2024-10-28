/** @format */

const setUserData = async (userData) => {
  window.localStorage.setItem("@userData", JSON.stringify(userData));
};
const getUserdata = () => {
  const data = window.localStorage.getItem("@userData");
  return data ? JSON.parse(data) : null;
};

const setToken = async (userToken) => {
  window.localStorage.setItem("@userToken", userToken);
};

const getToken = () => {
  return window.localStorage.getItem("@userToken");
};

const Logout = async () => {
  return (
    window.localStorage.removeItem("@userToken"),
    localStorage.removeItem("@parentStep"),
    localStorage.removeItem("@tutorStep"),
    localStorage.removeItem("role"),
    localStorage.removeItem("@userData")
  );
};

export { setUserData, setToken, getToken, getUserdata, Logout };
