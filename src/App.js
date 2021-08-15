import React from 'react'
import * as BooksAPI from './api/BooksAPI'
import './styles/App.css'
import Main from './views/Main'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
        console.log(books)
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/'>
          <Main books={this.state.books} />
        </Route>
      </div>
    )
  }
}

export default BooksApp
