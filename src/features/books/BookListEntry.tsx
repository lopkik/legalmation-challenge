import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSelectedBookId } from "./booksSlice";
import { DBBook } from "../../types";

interface BookListEntryProps {
  book: DBBook;
}

function BookListEntry(props: BookListEntryProps) {
  const { id, title } = props.book;
  const selectedBookId = useAppSelector((state) => state.books.selectedBookId);

  const dispatch = useAppDispatch();

  return (
    <div
      className="book-list-entry"
      onClick={() => dispatch(setSelectedBookId(id))}
      style={{
        backgroundColor: selectedBookId === id ? "#e1e1d5" : "white",
      }}
    >
      <div>{title}</div>
    </div>
  );
}

export default BookListEntry;
