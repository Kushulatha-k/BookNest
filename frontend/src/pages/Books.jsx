import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import PageWrapper from "../components/PageWrapper";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axios.get("/books");
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <PageWrapper bg="https://images.unsplash.com/photo-1507842217343-583bb7270b66">
      <Navbar />

      <div className="container mt-4">
        <h2 className="mb-4">📚 Books Collection</h2>

        <div className="row">
          {books.map((book) => (
            <div className="col-md-3 mb-4" key={book._id}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Books;
