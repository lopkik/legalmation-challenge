import { useState } from "react";
import AddBookForm from "./features/books/AddBookForm";
import { BookList } from "./features/books/BookList";
import EditBookForm from "./features/books/EditBookForm";
import { useAppSelector } from "./app/hooks";

function App() {
  const [searchText, setSearchText] = useState("");
  const selectedBookId = useAppSelector((state) => state.books.selectedBookId);

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

          <BookList searchText={searchText} />
        </div>
        <div>
          <div id="create-new-book">
            Add new book
            <AddBookForm />
          </div>

          <div id="selected-book">
            {selectedBookId ? <EditBookForm /> : <div>No book selected</div>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
