import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { deleteBook, updateBook } from "./booksSlice";

function EditBookForm() {
  const selectedBookId = useAppSelector((state) => state.books.selectedBookId);

  let book = useAppSelector((state) =>
    state.books.books.find((book) => book.id === selectedBookId)
  )!;
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [publishDate, setPublishDate] = useState(
    new Date(book.publishDate).toLocaleDateString("en-CA")
  );

  useEffect(() => {
    setTitle(book.title);
    setAuthor(book.author);
    setPublishDate(new Date(book.publishDate).toLocaleDateString("en-CA"));
  }, [book.id]);

  const updateSelectedBook = async () => {
    try {
      await dispatch(
        updateBook({ id: book.id, title, author, publishDate })
      ).unwrap();
    } catch (err) {
      // TODO: catch invalid form values
      if (typeof err === "string") {
        console.error(err);
      } else if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  const deleteSelectedBook = async () => {
    try {
      await dispatch(deleteBook(book.id)).unwrap();
    } catch (err) {
      if (typeof err === "string") {
        console.error(err);
      } else if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  return selectedBookId ? (
    <div>
      <div id="details-header">Book Details</div>
      <div id="details-buttons-container">
        <button onClick={() => updateSelectedBook()}>update</button>
        <button onClick={() => deleteSelectedBook()}>delete</button>
      </div>
      <form id="update-form">
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
      </form>
    </div>
  ) : (
    <div>No book selected</div>
  );
}

export default EditBookForm;
