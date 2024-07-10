import {
  AsyncThunk,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Book, BookSliceState, DBBook } from "../../types";

const initialState: BookSliceState = {
  books: [],
  selectedBookId: null,
  status: "idle",
  error: undefined,
};

export const fetchBooks: AsyncThunk<DBBook[], void, {}> = createAsyncThunk(
  "books/fetchBooks",
  async () => {
    const res = await fetch("/api/books");
    const resJson = await res.json();
    return resJson.books;
  }
);

export const addNewBook: AsyncThunk<DBBook, Book, {}> = createAsyncThunk(
  "books/addNewBook",
  async (newBookData: Book) => {
    const res = await fetch("/api/books", {
      method: "POST",
      body: JSON.stringify(newBookData),
    });
    const resJson = await res.json();
    return resJson.book;
  }
);

export const updateBook: AsyncThunk<DBBook, DBBook, {}> = createAsyncThunk(
  "books/updateBook",
  async (updateData) => {
    const res = await fetch(`/api/books/${updateData.id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
    const resJson = await res.json();
    return resJson;
  }
);

export const deleteBook: AsyncThunk<string, string, {}> = createAsyncThunk(
  "books/deleteBook",
  async (bookId: string) => {
    await fetch(`/api/books/${bookId}`, {
      method: "DELETE",
    });
    return bookId;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSelectedBookId(state, action: PayloadAction<string | null>) {
      return { ...state, selectedBookId: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = [...action.payload];
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder.addCase(addNewBook.fulfilled, (state, action) => {
      state.books.push(action.payload);
    });
    builder.addCase(updateBook.fulfilled, (state, action) => {
      const { id, title, author, publishDate } = action.payload;
      const existingBook = state.books.find((book) => book.id === id);
      if (existingBook) {
        existingBook.title = title;
        existingBook.author = author;
        existingBook.publishDate = publishDate;
      }
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
        selectedBookId: null,
      };
    });
  },
});

export const { setSelectedBookId } = booksSlice.actions;

export default booksSlice.reducer;
