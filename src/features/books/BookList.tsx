import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import BookListEntry from "./BookListEntry";
import { fetchBooks } from "./booksSlice";

interface BookListProps {
  searchText: string;
}

export function BookList(props: BookListProps) {
  const books = useAppSelector((state) => state.books.books);
  const dispatch = useAppDispatch();

  const bookStatus = useAppSelector((state) => state.books.status);
  const error = useAppSelector((state) => state.books.error);

  useEffect(() => {
    if (bookStatus === "idle") {
      dispatch(fetchBooks());
    }
  }, [bookStatus, dispatch]);

  let content;

  if (bookStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (bookStatus === "succeeded") {
    content = books
      .filter((book) =>
        book.title.toLowerCase().includes(props.searchText.toLowerCase())
      )
      .map((book) => <BookListEntry key={book.id} book={book} />);
  } else if (bookStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <div className="book-list-entry">
        <div className="title">Title</div>
        <div className="title">Author</div>
      </div>

      {content}
    </div>
  );
}
