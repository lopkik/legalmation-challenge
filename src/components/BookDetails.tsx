import { useState } from "react";
import { Book, DBBook, GetBooksData } from "../types";

interface BookDetailsProps extends DBBook {
  setBooks: React.Dispatch<React.SetStateAction<DBBook[]>>;
  setSelectedBookIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

function BookDetails(props: BookDetailsProps) {
  const [title, setTitle] = useState(props.title);
  const [author, setAuthor] = useState(props.author);
  const [publishDate, setPublishDate] = useState(
    new Date(props.publishDate).toLocaleDateString("en-CA")
  );

  const updateBook = async () => {
    try {
      // const formData = new FormData();
      // formData.append("title", title);
      // formData.append("author", author);
      // formData.append("publishDate", new Date(publishDate).toISOString());
      let formData: Book = {
        title,
        author,
        publishDate: new Date(publishDate).toISOString(),
      };
      const res = await fetch(`/api/books/${props.id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      console.log("put response", res);
      const newBooksRes = await fetch("/api/books");
      const newBooksJson: GetBooksData = await newBooksRes.json();
      props.setBooks(newBooksJson.books);
      props.setSelectedBookIndex(
        newBooksJson.books.findIndex((book) => book.id === props.id)
      );
    } catch (err) {
      if (typeof err === "string") {
        console.error(err);
      } else if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  const deleteBook = async () => {
    try {
      const res = await fetch(`/api/books/${props.id}`, { method: "DELETE" });
      console.log("delete response", res);
      const newBooksRes = await fetch("/api/books");
      const newBooksJson: GetBooksData = await newBooksRes.json();
      props.setBooks(newBooksJson.books);
      props.setSelectedBookIndex(null);
    } catch (err) {
      if (typeof err === "string") {
        console.error(err);
      } else if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  return (
    <div>
      <div id="details-header">Book Details</div>
      <div id="details-buttons-container">
        <button onClick={() => updateBook()}>update</button>
        <button onClick={() => deleteBook()}>delete</button>
      </div>
      <form id="update-form">
        <label>
          <div className="title">Title</div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <div>Author:</div>
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          <div>Publish Date:</div>
          <input
            type="date"
            name="publish-date"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
}

export default BookDetails;
