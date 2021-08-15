import React from "react";
import BookShelf from "./BookShelf";

const FilterBooks = (books, shelf) => {
  return books.filter((b) => b.shelf === shelf);
};

const BookList = (props) => {
  const currently = FilterBooks(props.books, "currentlyReading") || [];
  const read = FilterBooks(props.books, "read") || [];
  const want = FilterBooks(props.books, "wantToRead") || [];

  return (
    <div>
      <BookShelf
        books={currently}
        title='Currently Reading'
        updateBook={(book, shelf) => props.updateBook(book, shelf)}
      />
      <BookShelf
        books={want}
        title='Want to Read'
        updateBook={(book, shelf) => props.updateBook(book, shelf)}
      />
      <BookShelf
        books={read}
        title='Read'
        updateBook={(book, shelf) => props.updateBook(book, shelf)}
      />
    </div>
  );
};

export default BookList;
