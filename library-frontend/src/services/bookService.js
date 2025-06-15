import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/details`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const deleteBookById = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/books/deleteBook`, {
      data: { id },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting books: ", error);
    throw error;
  }
};
