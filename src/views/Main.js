import React, { Component } from "react";
import BookList from "./BookList";

class Main extends Component {
  render() {
    console.log(this.props.books || []);
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <BookList books={this.props.books} />
        </div>
        <div className='open-search'>
          <button onClick={() => this.setState({ showSearchPage: true })}>
            Add a book
          </button>
        </div>
      </div>
    );
  }
}

export default Main;
