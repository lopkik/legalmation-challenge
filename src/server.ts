import { createServer, Factory, Model } from "miragejs";
import { Book } from "./types";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    factories: {
      book: Factory.extend<Partial<Book>>({
        title(i) {
          return `Book ${i}`;
        },
        author(i) {
          return `author ${i}`;
        },
        publishDate(i) {
          let d = new Date();
          d.setDate(d.getDate() - i - 1);
          return d.toISOString();
        },
      }),
    },

    models: {
      book: Model.extend<Partial<Book>>({}),
    },

    seeds(server) {
      server.create("book", {
        title: "The Fellowship of the Ring",
        author: "J.R.R Tolkien",
        publishDate: new Date("1954-07-29").toISOString(),
      });
      server.create("book", {
        title: "The Two Towers",
        author: "J.R.R Tolkien",
        publishDate: new Date("1954-11-11").toISOString(),
      });
      server.create("book", {
        title: "The Return of the King",
        author: "J.R.R Tolkien",
        publishDate: new Date("1955-10-20").toISOString(),
      });
      server.createList("book", 2);
    },
    routes() {
      this.namespace = "api";

      this.get("/books");

      this.get("/books/:id");

      this.post("/books");

      this.put("/books/:id", function (schema, request) {
        let attrs = JSON.parse(request.requestBody);
        let { id } = request.params;
        schema.db.books.update(id, attrs);
        return schema.db.books.find(id);
      });

      this.del("/books/:id");
    },
  });

  return server;
}
