import { useState } from "react";
import AddBookForm from "./features/books/AddBookForm";
import { BookList } from "./features/books/BookList";
import EditBookForm from "./features/books/EditBookForm";

function App() {
  const [searchText, setSearchText] = useState("");

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
            <EditBookForm />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
