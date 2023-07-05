import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    const response = await fetch("http://localhost:5000/books");
    const books = await response.json();
    return books;
  };

  useEffect(() => {
    displayBooks();
  }, []);

  const displayBooks = async () => {
    const books = await fetchBooks();
    setBooks(books);
  };

  const addBook = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    };
    await fetch("http://localhost:5000/books", options);
    setTitle(""); // Reset the input field after adding the book
    setAuthor("");
    displayBooks();
  };
  const deleteBook = async (id) => {
    const options = {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    };
    await fetch(`http://localhost:5000/books/${id}`, options);
    displayBooks();
  };
  const updateBook = async (id) => {
    const bookToUpdate = books.find((book) => book.id === id);
    if (!bookToUpdate) return;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author }),
    };
    await fetch(`http://localhost:5000/books/${id}`, options);
    setTitle("");
    setAuthor("");
    setSelectedBook(null);
    displayBooks();
  };
  const editBook = (id) => {
    const bookToEdit = books.find((book) => book.id === id);
    if (!bookToEdit) {
      return;
    }
    setTitle(bookToEdit.title);
    setAuthor(bookToEdit.author);
    setSelectedBook(id);
  };
  return (
    <>
      <div className="container">
        <h1>Book Manager</h1>
        <form
          onSubmit={selectedBook ? () => updateBook(selectedBook) : addBook}
        >
          <br /> <br />
          <label htmlFor="title">Enter Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="eg... Computer Fundamentals"
          />
          <br /> <br />
          <label htmlFor="author">Enter Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="eg... Bill Gates"
          />
          <br /> <br />
          <button type="submit">
            {selectedBook ? "Update Book" : "Add Book"}
          </button>
        </form>
        <ul id="book-list">
          {books.map((book) => (
            <li key={book.id}>
              {book.id}.&nbsp;{book.title} <br /> Author:&nbsp;{book.author}
              <button
                type="button"
                id={book.id}
                className="btn"
                onClick={() => editBook(book.id)}
              >
                Edit
              </button>
              <button
                type="button"
                id={book.id}
                className="btn"
                onClick={() => deleteBook(book.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
