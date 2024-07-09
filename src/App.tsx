import { useEffect, useState } from "react";
import { DBBook } from "./types";
import BookListEntry from "./components/BookListEntry";
import BookDetails from "./components/BookDetails";
import CreateBookForm from "./components/CreateBookForm";

function App() {
  const [searchText, setSearchText] = useState("");
  const [books, setBooks] = useState<DBBook[]>([]);
  const [selectedBookIndex, setSelectedBookIndex] = useState<number | null>(
    null
  );

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
      <main>
        <div>
          <b>Search by title:</b>
          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <hr />

          <div>
            <div className="book-list-entry">
              <div className="title">Title</div>
              <div className="title">Author</div>
            </div>
            {books
              .filter((book) =>
                book.title.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((book, i) => (
                <BookListEntry
                  key={book.id}
                  onClick={() => setSelectedBookIndex(i)}
                  bookId={book.id!}
                  title={book.title}
                  author={book.author}
                  publishDate={book.publishDate}
                />
              ))}
          </div>
        </div>
        <div>
          <div id="create-new-book">
            Add new book
            <CreateBookForm setBooks={setBooks} />
          </div>

          <div id="selected-book">
            {selectedBookIndex === null ? (
              <span>No book selected</span>
            ) : (
              <BookDetails
                key={books[selectedBookIndex].id}
                id={books[selectedBookIndex].id}
                title={books[selectedBookIndex].title}
                author={books[selectedBookIndex].author}
                publishDate={books[selectedBookIndex].publishDate}
                setBooks={setBooks}
                setSelectedBookIndex={setSelectedBookIndex}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
