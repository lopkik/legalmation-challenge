// import { expect, test } from "vitest";
import "@testing-library/jest-dom";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";

// import { DBBook } from "../types";
import { makeServer } from "../api/server";
import App from "../App";
import { renderWithProviders } from "./test-utils";
import { BookList } from "../features/books/BookList";

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
    renderWithProviders(<BookList searchText="" />);
  });
});
// test("no books are initially seeded", async () => {
//   let server = makeServer("test");
//   //   screen.findByTestId()

//   await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
//   screen.debug();
//   expect(screen.getByText("No books found")).toBeInTheDocument();
//   server.shutdown();
// });

// test("existing books are shown", async () => {
//   let server = makeServer("test");
//   server.create("book");
//   server.shutdown();
// });
