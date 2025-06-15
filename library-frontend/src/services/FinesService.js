import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllFines = async () => {
  const res = await axios.get(`${BASE_URL}/fines`);
  return res.data;
};
