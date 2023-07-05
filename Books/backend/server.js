const express = require("express");
const cors = require("cors");
const PORT = 5000;
const app = express();
// middleware to parse json in request body
app.use(cors());
app.use(express.json());

let books = [
  { id: 1, title: "PHP & MySQL", author: "Bill Gates" },
  { id: 2, title: "SQL", author: "Elon Baba" },
  { id: 3, title: "Networking", author: "Sanju Bana" },
  { id: 4, title: "Data Structures", author: "Faraz" },
];

// get request
app.get("/books", (req, res) => {
  res.json(books);
});

// post requrest

app.post("/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});
// delete request
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter((book) => book.id !== bookId);
  res.sendStatus(204);
});

app.listen(PORT, () => console.log(`listening of port ${PORT}`));
