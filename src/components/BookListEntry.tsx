import { Book } from "../types";

interface BookListEntryProps extends Book {
  bookId: string;
}

function BookListEntry(props: BookListEntryProps) {
  return (
    <div className="book-list-entry">
      <div>{props.title}</div>
      <div>{props.author}</div>
      <div>{new Date(props.publishDate).toDateString()}</div>
    </div>
  );
}

export default BookListEntry;
