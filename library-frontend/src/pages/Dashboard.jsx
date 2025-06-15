import React, { useEffect, useState } from "react";
import { getAllBooks, deleteBookById } from "../services/bookService";
import { getAllGenres } from "../services/genreService";
import { Container, Row, Col, Form } from "react-bootstrap";
import BookTable from "../components/BookTable";
import FilterSidebar from "../components/FilterSidebar";
import { getAllAuthors } from "../services/authorsService";
import { toast } from "react-toastify";

function DashboardPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Filters
  const [minStock, setMinStock] = useState("");
  const [maxStock, setMaxStock] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);

  const fetchBooks = async () => {
    try {
      const allBooks = await getAllBooks();
      setBooks(allBooks);
      setFilteredBooks(allBooks);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();

    const fetchGenres = async () => {
      try {
        const allGenres = await getAllGenres();
        setGenres(allGenres);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };

    fetchGenres();

    const fetchAuthors = async () => {
      try {
        const allAuthors = await getAllAuthors();
        setAuthors(allAuthors);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };

    fetchAuthors();
  }, []);

  useEffect(() => {
    searchByTitle();
  }, [searchTitle]);

  const handleDelete = async (id) => {
    try {
      const result = await deleteBookById(id);
      toast.success(result.message);
      fetchBooks();
    } catch (error) {
      toast.error("Failed to delete the book.", error);
    }
  };

  const searchByTitle = () => {
    let filtered = books;
    if (searchTitle) {
      filtered = filtered.filter((b) =>
        b.title?.toLowerCase().includes(searchTitle.toLowerCase())
      );

      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  };

  const handleFilter = () => {
    let filtered = books;

    if (minStock)
      filtered = filtered.filter((b) => b.stock >= parseInt(minStock));
    if (maxStock)
      filtered = filtered.filter((b) => b.stock <= parseInt(maxStock));
    if (minDate)
      filtered = filtered.filter(
        (b) => new Date(b.release_date) >= new Date(minDate)
      );
    if (maxDate)
      filtered = filtered.filter(
        (b) => new Date(b.release_date) <= new Date(maxDate)
      );
    if (selectedGenre)
      filtered = filtered.filter((b) => b.genre_id == selectedGenre);
    if (selectedAuthor) {
      console.log(selectedAuthor);
      filtered = filtered.filter((b) => b.author_id == selectedAuthor);
    }

    setFilteredBooks(filtered);
  };

  const handleReset = () => {
    setMinStock("");
    setMaxStock("");
    setMinDate("");
    setMaxDate("");
    setSelectedGenre("");
    setSelectedAuthor("");
    setSearchTitle("");
    setFilteredBooks(books);
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={3}>
          <FilterSidebar
            minStock={minStock}
            maxStock={maxStock}
            setMinStock={setMinStock}
            setMaxStock={setMaxStock}
            minDate={minDate}
            maxDate={maxDate}
            setMinDate={setMinDate}
            setMaxDate={setMaxDate}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            selectedAuthor={selectedAuthor}
            setSelectedAuthor={setSelectedAuthor}
            genres={genres}
            authors={authors}
            handleFilter={handleFilter}
            handleReset={handleReset}
          />
        </Col>
        <Col md={9}>
          <h3 className="mb-3 text-start">All Books</h3>
          <Form.Control
            type="text"
            placeholder="Search by Title..."
            className="mb-3"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <BookTable books={filteredBooks} onDelete={handleDelete} />
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPage;
