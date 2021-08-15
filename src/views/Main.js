import React, { Component } from "react";
import BookList from "./BookList";
import { Link } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.props.clearBooks();
  }

  render() {
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <BookList
            books={this.props.books}
            updateBook={(book, shelf) => this.props.updateBook(book, shelf)}
          />
        </div>
        <div className='open-search'>
          <Link to='/search' className='open-search'>
            Add Book
          </Link>
        </div>
      </div>
    );
  }
}

export default Main;
