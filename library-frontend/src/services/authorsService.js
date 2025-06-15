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

export const createAuthor = async (authorData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/authors`, authorData);
    return response.data;
  } catch (error) {
    console.error("Error creating author:", error);
    throw error;
  }
};

export const deleteAuthor = async (authorId) => {
  return axios.delete(`${API_BASE_URL}/authors/deleteAuthor/${authorId}`);
};
