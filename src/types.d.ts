export interface Book {
  title: string;
  author: string;
  publishDate: string;
}

export interface DBBook extends Book {
  id: string;
}

export interface GetBooksData {
  books: DBBook[];
}
