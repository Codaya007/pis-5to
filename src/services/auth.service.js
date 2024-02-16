import axios from "axios";
const { API_BASEURL } = require("@/constants");

export const login = async (body) => {
  const url = `${API_BASEURL}/auth/login`;

  const { data: loginResponse } = await axios.post(url, body);

  return loginResponse;
};

export const registerUser = async (body, token) => {
  const url = `${API_BASEURL}/accounts`;

  const { data: registerResponse } = await axios.post(url, body, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return registerResponse;
};
