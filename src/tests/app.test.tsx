import "@testing-library/jest-dom";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { makeServer } from "../api/server";
import { renderWithProviders } from "./test-utils";
import { BookList } from "../features/books/BookList";
import App from "../App";

let typeServer = makeServer("test");
type TestServer = typeof typeServer;
typeServer.shutdown();

describe("BookList", () => {
  let server: TestServer;

  beforeEach(() => {
    server = makeServer("test");
  });

  afterEach(() => {
    server.shutdown();
  });

  it("shows 'No books found' when initially seeded", async () => {
    renderWithProviders(<BookList searchText="" />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    expect(screen.getByText("No books found")).toBeInTheDocument();
  });

  it("renders all books created on server", async () => {
    server.create("book", {
      title: "First book",
      publishDate: new Date(Date.now()).toISOString(),
    });
    server.create("book", {
      title: "Another book",
      publishDate: new Date(Date.now()).toISOString(),
    });
    server.create("book", {
      title: "aNoThEr book!",
      publishDate: new Date(Date.now()).toISOString(),
    });
    renderWithProviders(<BookList searchText="" />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    expect(screen.getByText("First book")).toBeInTheDocument();
    expect(screen.getByText("Another book")).toBeInTheDocument();
    expect(screen.getByText("aNoThEr book!")).toBeInTheDocument();
  });

  it("filters books using searchText correctly", async () => {
    server.create("book", {
      title: "a",
      publishDate: new Date(Date.now()).toISOString(),
    });
    server.create("book", {
      title: "A",
      publishDate: new Date(Date.now()).toISOString(),
    });
    server.create("book", {
      title: "b",
      publishDate: new Date(Date.now()).toISOString(),
    });

    renderWithProviders(<BookList searchText="a" />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    expect(screen.getAllByTestId("book-list-entry").length).toBe(2);
  });
});

describe("EditBookForm (GET/:id, PUT, DEL)", () => {
  let server: TestServer;

  beforeEach(() => {
    server = makeServer("test");
  });

  afterEach(() => {
    server.shutdown();
  });

  it("shows 'No book selected' when initialized", async () => {
    renderWithProviders(<App />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    expect(screen.getByText("No book selected")).toBeInTheDocument();
  });

  it("shows all book details", async () => {
    let currDate = new Date(Date.now());
    let author1 = server.create("author", {
      name: "Author 1",
      birthYear: 1982,
    });
    server.create("book", {
      title: "Book 1",
      author: author1,
      publishDate: currDate.toISOString(),
    });

    renderWithProviders(<App />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    userEvent.click(screen.getByText("Book 1"));

    // after clicking a BookListEntry, the corresponding bookId should be selected
    await waitForElementToBeRemoved(() => screen.getByText("No book selected"));
    expect(screen.getByDisplayValue("Book 1")).toBeInTheDocument();
    expect(
      (screen.getByTestId("edit-book-date") as HTMLInputElement).value
    ).toBe(currDate.toLocaleDateString("en-CA"));
    await waitForElementToBeRemoved(() => screen.getByText("Author: Unknown"));
    expect(
      screen.getByText("Author: Author 1 (born 1982)")
    ).toBeInTheDocument();
  });

  it("updates the BookList", async () => {
    server.create("book", {
      title: "Book 1",
      publishDate: new Date(Date.now()).toISOString(),
    });
    renderWithProviders(<App />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    userEvent.click(screen.getByText("Book 1"));

    await waitForElementToBeRemoved(() => screen.getByText("No book selected"));
    await userEvent.type(screen.getByTestId("edit-book-title"), ": Revengance");
    userEvent.click(screen.getByTestId("edit-update-button"));
    await waitForElementToBeRemoved(() => screen.getByText("Book 1"));
    expect(screen.getByText("Book 1: Revengance")).toBeInTheDocument();
  });

  it("deletes books from the BookList", async () => {
    server.create("book", {
      title: "Book 1",
      publishDate: new Date(Date.now()).toISOString(),
    });
    renderWithProviders(<App />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    userEvent.click(screen.getByText("Book 1"));

    await waitForElementToBeRemoved(() => screen.getByText("No book selected"));
    userEvent.click(screen.getByTestId("edit-delete-button"));
    await waitForElementToBeRemoved(() => screen.getByText("Book 1"));
    expect(screen.getByText("No books found")).toBeInTheDocument();
    expect(screen.getByText("No book selected")).toBeInTheDocument();
  });
});

describe("AddBookForm (POST)", () => {
  let server: TestServer;

  beforeEach(() => {
    server = makeServer("test");
  });

  afterEach(() => {
    server.shutdown();
  });

  it("adds book to BookList", async () => {
    renderWithProviders(<App />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    await userEvent.type(screen.getByTestId("add-book-title"), "New book");
    userEvent.click(screen.getByTestId("add-book-button"));

    await waitForElementToBeRemoved(() => screen.getByText("No books found"));
    expect(screen.getByText("New book")).toBeInTheDocument();
  });
});
