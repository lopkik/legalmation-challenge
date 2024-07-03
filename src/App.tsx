import { useEffect, useState } from "react";
import { Book } from "./types";

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((json) => setBooks(json.books));
  }, []);

  return (
    <div>
      <div>
        {books.length &&
          books.map((book) => <div key={book.id}>{book.title}</div>)}
      </div>
    </div>
  );
}

export default App;
