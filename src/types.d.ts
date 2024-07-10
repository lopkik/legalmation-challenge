export interface Book {
  title: string;
  author: string;
  publishDate: string;
}

export interface DBBook extends Book {
  id: string;
}

export interface BookListSlice {
  bookList: DBBook[];
  selectedBookIndex: number | null;
}

export interface BookSliceState {
  books: DBBook[];
  selectedBookId: string | null;
  status: Status;
  error: Error;
}

export type Status = "idle" | "loading" | "succeeded" | "failed";
export type Error = string | undefined;
