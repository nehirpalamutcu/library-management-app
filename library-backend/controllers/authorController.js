import db from "../db.js";

export const getAllAuthors = (req, res) => {
  const query = "select * from authors";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching authors: ", err.message);
      return res.status(500).json({ error: "Failed to fetch authors" });
    }

    res.json(results);
  });
};

export const getAuthorById = (req, res) => {
  const authorId = req.params.id;
  const query = "select * from authors where id = ?";

  db.query(query, [authorId], (err, results) => {
    if (err) {
      console.error("Error fetching author:", err.message);
      return res.status(500).json({ error: "Failed to fetch author" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.json(results[0]);
  });
};

export const getAuthorByFullName = (req, res) => {
  const { firstName, lastName } = req.query;

  const query = "select * from authors where first_name = ? and last_name = ?";

  db.query(query, [firstName, lastName], (err, results) => {
    if (err) {
      console.error("Error fetching author:", err.message);
      return res.status(500).json({ error: "Failed to fetch author" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.json(results[0]);
  });
};

export const createAuthor = (req, res) => {
  const { first_name, last_name, bio } = req.body;

  if (!first_name) {
    return res.status(400).json({ error: "First name is required." });
  }

  const query =
    "INSERT INTO authors (first_name, last_name, bio) VALUES (?, ?, ?)";

  const values = [first_name, last_name, bio || null];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting author:", err.message);
      return res.status(500).json({ error: "Failed to create author." });
    }

    res.status(201).json({
      message: "Author created successfully",
      author: {
        id: result.insertId,
        first_name,
        last_name,
        bio: bio || null,
      },
    });
  });
};

export const updateAuthor = (req, res) => {
  const { id, firstName, lastName, bio } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Author ID is required." });
  }

  if (!firstName && !lastName && !bio) {
    return res
      .status(400)
      .json({ error: "At least one field must be provided for update." });
  }

  const fields = [];

  const values = [];

  if (firstName) {
    fields.push("first_name = ?");
    values.push(firstName);
  }

  if (lastName) {
    fields.push("last_name = ?");
    values.push(lastName);
  }

  if (bio) {
    fields.push("bio = ?");
    values.push(bio);
  }

  values.push(id); // ID goes at the end for the WHERE clause

  const query = `UPDATE authors SET ${fields.join(", ")} WHERE id = ?`;

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating author:", err.message);
      return res.status(500).json({ error: "Failed to update author." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Author not found." });
    }

    res.json({ message: "Author updated successfully." });
  });
};

export const deleteAuthor = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Author ID is required." });
  }

  const checkBooksQuery = "SELECT * FROM books WHERE author_id = ?";
  db.query(checkBooksQuery, [id], (err, books) => {
    if (err) {
      console.error("Error checking books:", err.message);
      return res.status(500).json({ error: "Internal server error." });
    }

    if (books.length > 0) {
      return res
        .status(400)
        .json({ error: "This author has books and cannot be deleted." });
    }

    const deleteQuery = "DELETE FROM authors WHERE id = ?";
    db.query(deleteQuery, [id], (err, result) => {
      if (err) {
        console.error("Error deleting author:", err.message);
        return res.status(500).json({ error: "Failed to delete author." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Author not found." });
      }

      res.status(200).json({ message: "Author deleted successfully." });
    });
  });
};
