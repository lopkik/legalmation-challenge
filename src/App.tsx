import { useEffect, useState } from "react";
import { Book } from "./types";
import BookListEntry from "./components/BookListEntry";

function App() {
  const [searchText, setSearchText] = useState("");
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((json) => setBooks(json.books));
  }, []);

  return (
    <div id="main-container">
      <div id="header">
        <h1>Book List</h1>
      </div>
      <div>
        <div>
          <h3>Search by name</h3>
          <input
            type="text"
            name="book-title-search"
            id="book-title-search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        {books
          .filter((book) => book.title.includes(searchText))
          .map((book) => (
            <BookListEntry
              key={book.id}
              bookId={book.id!}
              title={book.title}
              author={book.author}
              publishDate={book.publishDate}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
