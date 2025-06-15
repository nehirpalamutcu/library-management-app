// 📄 src/services/borrowingsService.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * GET: Get all borrowings with author, title, status info
 */
export const getAllBorrowingss = async () => {
  const res = await axios.get(`${BASE_URL}/borrowings`);
  return res.data;
};

/**
 * DELETE: Delete a borrowing by ID
 */
export const deleteBorrowing = async (id) => {
  const res = await axios.delete(`${BASE_URL}/borrowings/${id}`);
  return res.data;
};

/**
 * POST: Add new borrowing
 * @param {Object} data - form data for the new borrowing
 */
export const addBorrowing = async (data) => {
  const res = await axios.post(`${BASE_URL}/borrowings`, data);
  return res.data;
};

