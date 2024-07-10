import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addNewBook } from "./booksSlice";

function AddBookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishDate, setPublishDate] = useState(
    new Date(Date.now()).toLocaleDateString("en-CA")
  );
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useAppDispatch();

  const canSave =
    [title, author, publishDate].every(Boolean) && addRequestStatus === "idle";

  const addBook = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        await dispatch(addNewBook({ title, author, publishDate })).unwrap();
        setTitle("");
        setAuthor("");
        setPublishDate(new Date(Date.now()).toLocaleDateString("en-CA"));
      } catch (err) {
        // TODO: catch invalid form values
        if (typeof err === "string") {
          console.error("Failed to add book", err);
        } else if (err instanceof Error) {
          console.error("Failed to add book", err.message);
        }
      } finally {
        setAddRequestStatus("idle");
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
      <button type="button" onClick={() => addBook()}>
        Add
      </button>
    </form>
  );
}

export default AddBookForm;
