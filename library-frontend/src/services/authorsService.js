import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllAuthors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/authors`);
    return response.data;
  } catch (error) {
    console.error("Error fetching authors:", error);
    throw error;
  }
};
