import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { deleteBook, updateBook } from "./booksSlice";
import { Author } from "../../types";

function EditBookForm() {
  const selectedBookId = useAppSelector((state) => state.books.selectedBookId);
  const book = useAppSelector((state) =>
    state.books.books.find((book) => book.id === selectedBookId)
  )!;
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>(book.title);
  const [author, setAuthor] = useState<Author | null>(null);
  const [publishDate, setPublishDate] = useState<string>(
    new Date(book.publishDate).toLocaleDateString("en-CA")
  );

  useEffect(() => {
    if (selectedBookId) {
      setTitle(book.title);
      setPublishDate(new Date(book.publishDate).toLocaleDateString("en-CA"));
      (async function () {
        try {
          const authorRes = await fetch(`api/books/${selectedBookId}`);
          const authorResJson = await authorRes.json();
          setAuthor(authorResJson ? authorResJson.author : null);
        } catch (err) {
          if (typeof err === "string") {
            console.error(err);
          } else if (err instanceof Error) {
            console.error(err.message);
          }
        }
      })();
    }
  }, [selectedBookId]);

  const updateSelectedBook = async () => {
    try {
      await dispatch(
        updateBook({ id: book.id, title: title!, publishDate })
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
          <div>Publish Date:</div>
          <input
            type="date"
            name="publish-date"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
          />
        </label>
        <div>
          {author ? (
            <span>
              Author: {author.name} (born {author.birthYear})
            </span>
          ) : (
            <span>Author: Unknown</span>
          )}
        </div>
      </form>
    </div>
  );
}

export default EditBookForm;
