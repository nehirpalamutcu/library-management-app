import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllGenres = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/genres`);
    return response.data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};
