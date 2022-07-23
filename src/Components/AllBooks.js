
import { useState } from 'react';
const AllBooks = ({books, onChangeShelf})=> {
    return ( <div>
      <ol className="books-grid">
        {books.map((book)=>(
          <li key={book.id}>
            <div className="book">  
              <div className="book-top">
                <div
                   className="book-cover"
                   style={{
                      width: 128,
                      height: 193,
                      backgroundImage:`url(${book.imageLinks.thumbnail})`
                    }}
                >
                </div>
                <div className="book-shelf-changer">
                  <select onChange={(e)=>onChangeShelf(book, e.target.value)}>
                    <option value="none" disabled>
                      Move to...
                    </option>
                    <option value="none">None</option>
                    <option value="currentlyReading">
                      Currently Reading
                    </option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}
              </div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
          ))
        }
      </ol>
      </div>
    );
    
}

export default AllBooks;

