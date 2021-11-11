import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import PropTypes from 'prop-types';

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    clearBooks: PropTypes.func.isRequired,
    updateBook: PropTypes.func.isRequired,
    searchBooks: PropTypes.func.isRequired,
  }
  
  state = {
    query: "",
  };

  searchQuery = (query) => {
    this.setState(
      () => ({
        query: query,
      }),
      () => {
        if (query != null && query.trim() !== "") {
          this.props.searchBooks(query);
        } else {
          this.props.searchBooks(" ");
        }
      }
    );
  };

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>
            Close
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              value={this.state.query}
              onChange={(e) => this.searchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.props.books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  updateBook={(shelf) => this.props.updateBook(book, shelf)}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
