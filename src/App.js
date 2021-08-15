import React from "react";
import * as BooksAPI from "./api/BooksAPI";
import "./styles/App.css";
import Main from "./views/Main";
import Search from "./views/Search";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: [],
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      let updatedBooks = this.state.books;
      let bookToUpdate = updatedBooks.findIndex((b) => b.title === book.title);
      if (bookToUpdate >= 0) {
        BooksAPI.get(updatedBooks[bookToUpdate].id).then((updatedBook) => {
          updatedBooks[bookToUpdate] = updatedBook;
          this.setState(() => ({
            books: updatedBooks,
          }));
        });
      } else {
        book.shelf = shelf;
        updatedBooks.push(book);
      }
    });
  }

  searchBooks(query) {
    BooksAPI.search(query).then((searchBooks) => {
      if (searchBooks && searchBooks.error) {
        this.setState(() => ({
          searchBooks: [],
        }));
      } else {
        this.setState(() => ({
          searchBooks,
        }));
      }
    });
  }

  clearBooks() {
    this.setState(() => ({
      searchBooks: [],
    }));
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/'>
          <Main
            books={this.state.books}
            updateBook={(book, shelf) => this.updateBook(book, shelf)}
            clearBooks={() => this.clearBooks()}
          />
        </Route>
        <Route path='/search'>
          <Search
            searchBooks={(query) => this.searchBooks(query)}
            books={this.state.searchBooks || []}
            updateBook={(book, shelf) => this.updateBook(book, shelf)}
            clearBooks={() => this.clearBooks()}
          />
        </Route>
      </div>
    );
  }
}

export default BooksApp;
