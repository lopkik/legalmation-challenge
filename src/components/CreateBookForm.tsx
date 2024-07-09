import { useState } from "react";
import { DBBook, GetBooksData } from "../types";

interface CreateBookFormProps {
  setBooks: React.Dispatch<React.SetStateAction<DBBook[]>>;
}

function CreateBookForm(props: CreateBookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishDate, setPublishDate] = useState(
    new Date(Date.now()).toLocaleDateString("en-CA")
  );

  const createBook = async () => {
    try {
      if (!title || !author) {
        throw new Error("Invalid Form Value");
      }
      const formData = {
        title,
        author,
        publishDate,
      };
      const res = await fetch(`/api/books`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const newBooksRes = await fetch("/api/books");
      const newBooksJson: GetBooksData = await newBooksRes.json();
      props.setBooks(newBooksJson.books);
      setTitle("");
      setAuthor("");
      setPublishDate(new Date(Date.now()).toLocaleDateString("en-CA"));
    } catch (err) {
      // TODO: catch invalid form values
      if (typeof err === "string") {
        console.error(err);
      } else if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  return (
    <form>
      <label>
        <div>Title</div>
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
      <button type="button" onClick={() => createBook()}>
        Add
      </button>
    </form>
  );
}

export default CreateBookForm;
