import React from "react";
import Book from "./Book";
import PropTypes from 'prop-types';

const BookShelf = (props) => {
  return (
    <div>
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{props.title}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {props.books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  updateBook={(shelf) => props.updateBook(book, shelf)}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default BookShelf;
