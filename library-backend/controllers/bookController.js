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

export const getBookDetails = (req, res) => {
  const query = `
    SELECT 
      b.title,
      b.stock,
      g.description AS genre,
      b.genre_id,
      b.release_date,
      CONCAT(a.first_name, ' ', a.last_name) AS author,
      b.author_id
    FROM books b
    JOIN authors a ON b.author_id = a.id
    JOIN t_genres g ON b.genre_id = g.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching book details:", err.message);
      return res.status(500).json({ error: "Failed to fetch book details." });
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

export const getBooksByGenreDescription = (req, res) => {
  const { genre } = req.query;

  if (!genre) {
    return res.status(400).json({ error: "Genre description is required." });
  }

  const query = `
    SELECT b.*
    FROM books b
    JOIN t_genres g ON b.genre_id = g.id
    WHERE lower(g.description) LIKE ?
  `;

  db.query(query, [`%${genre}%`], (err, results) => {
    if (err) {
      console.error("Error fetching books by genre:", err.message);
      return res.status(500).json({ error: "Failed to fetch books." });
    }

    res.json(results);
  });
};

export const createBook = (req, res) => {
  const { title, release_date, author_id, genre_id, stock } = req.body;

  if (!title || !release_date || !author_id || !genre_id || stock == null) {
    return res.status(400).json({ error: "Missing required book fields." });
  }

  const query = `
    INSERT INTO books (title, release_date, author_id, genre_id, stock)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [title, release_date, author_id, genre_id, stock],
    (err, result) => {
      if (err) {
        console.error("Error creating book:", err.message);
        return res.status(500).json({ error: "Failed to create book" });
      }

      res.status(201).json({
        message: "Book created successfully",
        bookId: result.insertId,
      });
    }
  );
};

export const updateBook = (req, res) => {
  const { id, title, release_date, author_id, genre_id, stock } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Book ID is required." });
  }

  if (!title && !release_date && !author_id && !genre_id && stock == null) {
    return res
      .status(400)
      .json({ error: "At least one field must be provided for update." });
  }

  const fields = [];
  const values = [];

  if (title) {
    fields.push("title = ?");
    values.push(title);
  }

  if (release_date) {
    fields.push("release_date = ?");
    values.push(release_date);
  }

  if (author_id) {
    fields.push("author_id = ?");
    values.push(author_id);
  }

  if (genre_id) {
    fields.push("genre_id = ?");
    values.push(genre_id);
  }

  if (stock != null) {
    fields.push("stock = ?");
    values.push(stock);
  }

  values.push(id);

  const query = `UPDATE books SET ${fields.join(", ")} WHERE id = ?`;

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating book:", err.message);
      return res.status(500).json({ error: "Failed to update book." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found." });
    }

    res.json({ message: "Book updated successfully." });
  });
};

export const deleteBook = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Book ID is required." });
  }

  const query = "DELETE FROM books WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting book:", err.message);
      return res.status(500).json({ error: "Failed to delete book." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found." });
    }

    res.json({ message: "Book deleted successfully." });
  });
};
