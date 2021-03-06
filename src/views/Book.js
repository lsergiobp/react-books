import React from "react";
import PropTypes from 'prop-types';

const formatAuthors = (authors) => {
  return authors != null ? authors.join(", ") : "";
};

const getThumbnail = (imageLinks) => {
  return imageLinks != null ? imageLinks.thumbnail : "";
};

const Book = (props) => {
  return (
    <div className='book'>
      <div className='book-top'>
        <div
          className='book-cover'
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${getThumbnail(props.book.imageLinks)})`,
          }}
        />
        <div className='book-shelf-changer'>
          <select
            onChange={(e) => props.updateBook(e.target.value)}
            defaultValue={props.book.shelf ? props.book.shelf : "none"}
          >
            <option value='move' disabled>
              Move to...
            </option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        </div>
      </div>
      <div className='book-title'>{props.book.title}</div>
      <div className='book-authors'>{formatAuthors(props.book.authors)}</div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  updateBook: PropTypes.func.isRequired,
}

export default Book;
