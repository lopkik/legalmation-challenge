import { belongsTo, createServer, Factory, Model } from "miragejs";
import { Author, Book } from "../types";

export function makeServer(environment = "development") {
  let server = createServer({
    environment,

    factories: {
      book: Factory.extend<Partial<Book>>({
        title(i) {
          return `Book ${i + 1}`;
        },
        publishDate(i) {
          let d = new Date();
          d.setDate(d.getDate() - i - 1);
          return d.toISOString();
        },
      }),
    },

    models: {
      author: Model.extend<Partial<Author>>({}),
      book: Model.extend({
        author: belongsTo(),
      }),
    },

    seeds(server) {
      let tolkien = server.create("author", {
        name: "J.R.R. Tolkien",
        birthYear: 1892,
      });
      let asimov = server.create("author", {
        name: "Isaac Asimov",
        birthYear: 1920,
      });
      server.create("book", {
        title: "The Fellowship of the Ring",
        author: tolkien,
        publishDate: new Date("1954-07-29").toISOString(),
      });
      server.create("book", {
        title: "The Two Towers",
        author: tolkien,
        publishDate: new Date("1954-11-11").toISOString(),
      });
      server.create("book", {
        title: "The Return of the King",
        author: tolkien,
        publishDate: new Date("1955-10-20").toISOString(),
      });
      server.create("book", {
        title: "I, Robot",
        author: asimov,
        publishDate: new Date("1950-12-02").toISOString(),
      });
      server.create("book", {
        title: "The Gods Themselves",
        author: asimov,
        publishDate: new Date("1972-05-01").toISOString(),
      });
      server.createList("book", 2);
    },
    routes() {
      this.namespace = "api";

      this.get("/books", function (schema) {
        return schema.all("book");
      });

      this.get("/books/:id", function (schema, request) {
        let book = schema.find("book", request.params.id);
        if (!book) return { error: "Invalid ID" };
        return {
          title: book.title,
          publishDate: book.publishDate,
          author: book.author,
        };
      });

      this.post("/books", function (schema, request) {
        let attrs = JSON.parse(request.requestBody);
        return schema.create("book", attrs);
      });

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
