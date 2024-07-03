import { createServer, Factory, Model } from "miragejs";
import { Book } from "./types";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    factories: {
      book: Factory.extend<Partial<Book>>({
        get title() {
          return "book1";
        },
        get author() {
          return "author1";
        },
        get publishDate() {
          return new Date();
        },
      }),
    },

    models: {
      book: Model.extend<Partial<Book>>({}),
    },

    seeds(server) {
      server.create("book", {
        title: "book 1",
        author: "someone",
        publishDate: new Date(),
      });
      server.createList("book", 5);
    },
    routes() {
      this.namespace = "api";

      this.get("/books");

      this.get("/books/:id");

      this.post("/books");

      this.patch("/books/:id");

      this.del("/books/:id");
    },
  });

  return server;
}
