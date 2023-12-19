import Http from "../helpers/http";

const login = async (email, password) => {
  const body = { email, password };
  return await Http.post("/auth/login", body).then((response) => {
    return response;
  });
};

const register = async (
  fullname,
  username,
  email,
  password,
  confirm_password
) => {
  const body = { fullname, username, email, password, confirm_password };
  return await Http.post("/auth/register", body).then((response) => {
    return response;
  });
};

const updateMe = async (data) => {
  return await Http.patch("/auth/me", data).then((response) => {
    return response;
  });
};

const changePassword = async (data) => {
  return await Http.update("/auth/change-password", data).then((response) => {
    return response;
  });
};

const forgotPassword = async (data) => {
  return await Http.post("/auth/forgot-password", data).then((response) => {
    return response;
  });
};

const resetPassword = async (data) => {
  return await Http.post("/auth/reset-password", data).then((response) => {
    return response;
  });
};

const fetchUserByID = async () => {
  try {
    const response = await Http.get(`/auth/me`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const logout = async (refreshToken) => {
  const body = { refreshToken };
  return await Http.post("/auth/logout", body).then((response) => {
    return response;
  });
};
export const userService = {
  login,
  register,
  updateMe,
  fetchUserByID,
  changePassword,
  forgotPassword,
  resetPassword,
  logout,
};
