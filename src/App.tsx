import { useEffect, useState } from "react";
import { DBBook } from "./types";
import BookListEntry from "./components/BookListEntry";
import BookDetails from "./components/BookDetails";

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
          <h3>Search by name</h3>
          <input
            type="text"
            name="book-title-search"
            id="book-title-search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <span>
            <button>Create New</button>
          </span>
        </div>
        <div id="two-pane-container">
          <div>
            <div className="book-list-entry">
              <div className="title">Title</div>
              <div className="title">Author</div>
            </div>
            {books
              .filter((book) => book.title.includes(searchText))
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
