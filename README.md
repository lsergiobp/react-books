## MyReads Project
This MyReads project is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read.
In this application, the main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:
- Currently Reading
- Want to Read
- Read
Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. Note that the default value for the control should always be the current shelf the book is in.
The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library.

## Running instructions
To get started lauching right away:

* install all project dependencies with `npm install`
* start the server with `npm start`
* it will launch on http://localhost:3000

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
