import React from "react";

const formatAuthors = (authors) => {
  return authors != null ? authors.map((a) => `${a}`) : "";
};

const getThumbnail = (imageLinks) => {
  return imageLinks != null ? imageLinks.thumbnail : "";
};

const Book = (props) => {
  console.log(props.book);
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
          <select>
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

export default Book;
