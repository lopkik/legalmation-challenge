import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { deleteBook, updateBook } from "./booksSlice";

// interface EditBookFormProps {
//   selectedBookId
// }

function EditBookForm() {
  const selectedBookId = useAppSelector((state) => state.books.selectedBookId);
  const book = useAppSelector((state) =>
    state.books.books.find((book) => book.id === selectedBookId)
  )!;
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>(book.title);
  const [author, setAuthor] = useState<string>(book.author);
  const [publishDate, setPublishDate] = useState<string>(
    new Date(book.publishDate).toLocaleDateString("en-CA")
  );

  useEffect(() => {
    if (selectedBookId) {
      setTitle(book.title);
      setAuthor(book.author);
      setPublishDate(new Date(book.publishDate).toLocaleDateString("en-CA"));
    }
  }, [selectedBookId]);

  const updateSelectedBook = async () => {
    try {
      await dispatch(
        updateBook({ id: book.id, title: title!, author: author!, publishDate })
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

  return (
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
  );
}

export default EditBookForm;
