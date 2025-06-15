// 📄 src/services/usersService.js

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
};
