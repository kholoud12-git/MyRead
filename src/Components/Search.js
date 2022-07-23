import { useState } from 'react';
import * as BookAPI from '../BooksAPI';
const SearchPage =({showSearchPage, setShowSearchpage,onChangeShelf}) => {

    const [bookList, setBookList] = useState([])
    const numRes = 20;

    const updateQuery = async (e) => {
        const res =await BookAPI.search(e.target.value,numRes)
        setBookList(res);
        console.log(res)
      };
   

  /*   const addShelf = (book,e) =>{
        console.log(book.id, book.shelf,e)
        if(book.shelf === 'undefined'){
            bookList.forEach(b => {
                if(b.id === book.id){
                    b.shelf = e;
                    BookAPI.update(book,b.shelf);
                    setFlag(!flag)
                    console.log(flag)
                }
            })
        }else{
            let bookOne = bookList.filter(b=>b.id === book.id)
            bookOne.shelf = e;
            BookAPI.update(book,bookOne.shelf);
            setFlag(!flag)
            console.log(flag)
        }

        if(!bookList.some(b => b.hasOwnProperty('shelf'))){
            bookList.forEach(b =>
                {
                    if(b.id == book.id){
                        b.shelf = e
                        console.log(b.shelf)
                        console.log((bookList.some(b => b.hasOwnProperty('shelf'))))
                        BookAPI.update(book,b.shelf);
                    }
                }
            )

        }

      }
  */

    return ( <div>
  <div className="search-books">
    <div className="search-books-bar">
      <a
        className="close-search"
        onClick={() => setShowSearchpage(!showSearchPage)}
      >
        Close
      </a>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          onChange={(e)=>updateQuery(e)}
        />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
      {bookList == []
      ? <p>There is no books</p>
      :bookList.map((book)=>(
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
                ></div>
                <div className="book-shelf-changer">
                  <select onChange={(e)=> onChangeShelf(book,e.target.value)}>
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
              <div  className="book-title" >{book.title}</div>
              <div className="book-authors">{book.authors}</div>
              <div className="book-authors">{book.shelf}</div>
            </div>
          </li>
        ))
     }
      </ol>
    </div>
  </div>
</div>);
}

export default SearchPage;