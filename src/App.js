import React from "react";
import * as BooksAPI from "./api/BooksAPI";
import "./styles/App.css";
import Main from "./views/Main";
import Search from "./views/Search";
import { Route } from "react-router-dom";
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: [],
    loading: false,
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    this.changeLoadStatus(true, () => { 
      BooksAPI.getAll().then((books) => {
        this.setState(() => ({
          books,
        }));
        this.changeLoadStatus(false, ()=>{});
      });
    });
  }

  updateBook(book, shelf) {
    this.changeLoadStatus(true, () => { 
      //Update book
      BooksAPI.update(book, shelf).then(() => {
        let updatedBooks = this.state.books;
        let bookToUpdate = updatedBooks.findIndex((b) => b.title === book.title);
        //Find if already exists on the books list
        if (bookToUpdate >= 0) {
          BooksAPI.get(updatedBooks[bookToUpdate].id).then((updatedBook) => {
            updatedBooks[bookToUpdate] = updatedBook;
            //Here is where after updated and fetched from the API, the UI refreshes so the user can see the changes.
            this.setState(() => ({
              books: updatedBooks,
            }));
            this.changeLoadStatus(false, ()=>{});
          });
        } else {
          //Do not exists on book list, so only changes on the search page but doesnt need to reload untill click back to main page
          book.shelf = shelf;
          updatedBooks.push(book);
          this.changeLoadStatus(false, ()=>{});
        }
      })
    }
   )
  }

  searchBooks(query) {
    this.changeLoadStatus(true, () => { 
      BooksAPI.search(query).then((searchBooks) => {
        if (searchBooks && searchBooks.error) {
          this.setState(() => ({
            searchBooks: [],
          }));
          this.changeLoadStatus(false, ()=>{});
        } else {
          let filteredBooks = searchBooks.map((b) => {
            let currentBook = this.state.books.find((cb) => cb.id === b.id);
            return currentBook ? { ...b, ...currentBook } : b;
          });
          this.setState(() => ({
            searchBooks: filteredBooks,
          }), () => query.trim === "" ? this.clearBooks() : "");
          this.changeLoadStatus(false, ()=>{});
        }
      })
    });
  }

  clearBooks() {
    this.setState(() => ({
      searchBooks: [],
    }));
  }
  
  changeLoadStatus(isLoad, callBack) {
  	this.setState({
      loading: isLoad,
    }, () => { callBack() });
  }

  render() {
    return (
      <LoadingMask loading={this.state.loading} text="LOADING">
        <div className='app'>
          <Route exact path='/'>
            <Main
              books={this.state.books}
              updateBook={(book, shelf) => this.updateBook(book, shelf)}
			  setLoading={(isLoad) => this.changeLoadStatus(isLoad)}
              clearBooks={() => this.clearBooks()}
            />
          </Route>
          <Route path='/search'>
            <Search
              searchBooks={(query) => this.searchBooks(query)}
              books={this.state.searchBooks || []}
              updateBook={(book, shelf) => this.updateBook(book, shelf)}
			  setLoading={(isLoad) => this.changeLoadStatus(isLoad)}
              clearBooks={() => this.clearBooks()}
            />
          </Route>
      </div>
	</LoadingMask>
    );
  }
}

export default BooksApp;
