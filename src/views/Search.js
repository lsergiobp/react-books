import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

class Search extends Component {
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
          this.props.clearBooks();
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
              <li key={book.title}>
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
