import React, { useEffect, useState } from "react";
import AuthorTable from "../components/AuthorTable";
import {
  getAllAuthors,
  createAuthor,
  deleteAuthor,
} from "../services/authorsService";
import { toast } from "react-toastify";

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState({
    first_name: "",
    last_name: "",
    bio: "",
  });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const data = await getAllAuthors();
      setAuthors(data);
    } catch (error) {
      console.error("Error loading authors:", error);
      toast.error("Failed to load authors.");
    }
  };

  const handleInputChange = (e) => {
    setNewAuthor({
      ...newAuthor,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAuthor = async (e) => {
    e.preventDefault();
    try {
      await createAuthor(newAuthor);
      toast.success("Author created successfully.");
      setNewAuthor({ first_name: "", last_name: "", bio: "" });
      setShowForm(false);
      fetchAuthors();
    } catch (error) {
      console.error("Error creating author:", error);
      toast.error("Failed to create author.");
    }
  };

  const handleDeleteAuthor = async (authorId) => {
    try {
      const response = await deleteAuthor(authorId);
      toast.success(response.data.message || "Author deleted successfully.");
      fetchAuthors(); // ✅ Listeyi yeniden getir
    } catch (error) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error); // örn: "Author has books..."
      } else {
        toast.error("An unexpected error occurred while deleting the author.");
      }
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Author List</h2>

      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "Add New Author"}
      </button>

      {showForm && (
        <form onSubmit={handleCreateAuthor} className="mb-4">
          <div className="form-group mb-2">
            <label>First Name</label>
            <input
              name="first_name"
              className="form-control"
              value={newAuthor.first_name}
              onChange={(e) => {
                e.target.setCustomValidity("");
                handleInputChange(e);
              }}
              onInvalid={(e) =>
                e.target.setCustomValidity("Please fill in the first name.")
              }
              required
            />
          </div>

          <div className="form-group mb-2">
            <label>Last Name</label>
            <input
              name="last_name"
              className="form-control"
              value={newAuthor.last_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group mb-2">
            <label>Bio</label>
            <textarea
              name="bio"
              className="form-control"
              value={newAuthor.bio}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Create Author
          </button>
        </form>
      )}

      <AuthorTable authors={authors} onDelete={handleDeleteAuthor} />
    </div>
  );
};

export default AuthorsPage;
