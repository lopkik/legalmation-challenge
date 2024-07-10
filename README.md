# Legalmation Challenge

Vite + Redux + React + MirageJS App displaying a list of books

## How to run the development server

Pull down the repo and install deps:

```
git clone git@github.com:lopkik/legalmation-challenge.git
cd legalmation-challenge
npm install
npm run dev
```

## How to test the app

After following the above steps run the command below:

```
npm run test
```

## MirageJS Routes

### GET /api/books
Fetches all books

```
const res = await fetch("/api/books");
const resJson = await res.json();
/*
resJson = {
  books: [
    {
      id: "1",
      title: "Book 1",
      publishDate: "2024-07-10T15:53:53.001Z"
    }
  ]
}
*/
```

### GET /api/books/:id
Fetches a book and its corresponding author data

```
const res = await fetch("/api/books/1");
const resJson = await res.json();
/*
resJson = {
  title: "Book 1",
  publishDate: "2024-07-10T15:53:53.001Z",
  author: {
    name: "Author 1",
    birthYear: 1992
  }
}
*/
```

### POST /api/books
Adds a new book to the database

```
const res = await fetch("/api/books", {
  method: "POST",
  body: JSON.stringify({
    title: "New Book",
    publishDate: "2024-07-10T15:53:53.001Z"
  }),
});
const resJson = await res.json();
/* 
resJson = {
  book: {
    id: "2",
    title: "New Book",
    publishDate: "2024-07-10T15:53:53.001Z"
  }
}
*/
```

### PUT /api/books/:id
Updates an existing book by its ID

```
const res = await fetch("/api/books/1", {
  method: "PUT",
  body: JSON.stringify({
    title: "New Title",
    publishDate: "2024-07-10T15:53:53.001Z"
  }),
});
const resJson = await res.json();
/*
resJson = {
  authorId: "1",
  id: "1",
  title: "New Title",
  publishDate: "2024-07-10T15:53:53.001Z"
}
*/
```

### DELETE /api/books/:id
Deletes an existing book by its ID

```
const res = await fetch("/api/books/1", {
  method: "DELETE"
});
const resJson = await res.json();
/*
resJson = ""
*/
```
