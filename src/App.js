import React from "react";
import * as BooksAPI from "./api/BooksAPI";
import "./styles/App.css";
import Main from "./views/Main";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
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
      BooksAPI.get(updatedBooks[bookToUpdate].id).then((updatedBook) => {
        updatedBooks[bookToUpdate] = updatedBook;
        this.setState(() => ({
          books: updatedBooks,
        }));
      });
    });
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/'>
          <Main
            books={this.state.books}
            updateBook={(book, shelf) => this.updateBook(book, shelf)}
          />
        </Route>
      </div>
    );
  }
}

export default BooksApp;
