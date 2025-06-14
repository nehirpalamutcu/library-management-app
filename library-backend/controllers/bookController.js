import db from "../db.js";

export const getAllBooks = (req, res) => {
  const query = " select * from books";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching books: ", err.message);
      return res.status(500).json({ error: "Failed to fetch books" });
    }

    res.json(results);
  });
};

export const getBookByStock = (req, res) => {
  const { minStock } = req.query;

  const query = "select * from books where stock >= ?";

  if (!minStock) {
    return res.status(400).json({ error: "minStock query param is required." });
  }

  db.query(query, [minStock], (err, results) => {
    if (err) {
      console.error("Error fetching books by stock:", err.message);
      return res.status(500).json({ error: "Failed to fetch books by stock" });
    }

    res.json(results);
  });
};

export const getBookByTitle = (req, res) => {
  const { bookTitle } = req.query;

  if (!bookTitle) {
    return res
      .status(400)
      .json({ error: "Title query parameter is required." });
  }
  const query = "select * from books where title like ?";

  db.query(query, [`%${bookTitle}%`], (err, results) => {
    if (err) {
      console.error("Error searching books by title", err.message);
      return res.status(500).json({ error: "Failed to search books" });
    }

    res.json(results);
  });
};
