import { Book } from "../types";

interface BookListEntryProps extends Book {
  bookId: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function BookListEntry(props: BookListEntryProps) {
  return (
    <div className="book-list-entry" onClick={props.onClick}>
      <div>{props.title}</div>
      <div style={{ textAlign: "end" }}>{props.author}</div>
    </div>
  );
}

export default BookListEntry;
