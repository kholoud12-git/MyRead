import "./App.css";
import { useState, useEffect } from "react";
import * as BookAPI from './BooksAPI';
import AllBooks from "./Components/AllBooks";
import SearchPage from "./Components/Search";
function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  let [flag, setFlag] = useState(true)
  useEffect (() =>{
    const getBooks = async () => {
      const res = await BookAPI.getAll();
      setAllBooks(res);
    };
    getBooks();
  }, []);

  useEffect(()=>{
    // console.log('2nd')
    if(flag === false){
      const getUpdatedBooks = async () => {
        const res = await BookAPI.getAll();
        console.log(res)
        setAllBooks(res);
      };
      getUpdatedBooks();
    }
    return () => {
      flag = true
      setFlag(flag)
    }
    
  },[!flag])


  const handleChangeShelf = (book,e) =>{
    let bookOne = allBooks.filter(b=>b.id === book.id)
    bookOne.shelf = e;
    BookAPI.update(book,bookOne.shelf);
    flag= false
    setFlag(flag)
    
  }
  return (
    <div className="app">
    
      {showSearchPage ? (
        <SearchPage 
          showSearchPage={showSearchPage} 
          setShowSearchpage= {setShowSearchpage}
          books = {allBooks}
          onChangeShelf = {handleChangeShelf}
          setBook = {setAllBooks}
           />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  
                  {
                      <AllBooks 
                         books = {allBooks.filter(b=>b.shelf === "currentlyReading")} 
                         onChangeShelf = {handleChangeShelf}/>
                  }
                    
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  
                  {
                      <AllBooks 
                        books = {allBooks.filter(b=>b.shelf === "wantToRead")} 
                        onChangeShelf = {handleChangeShelf}
                      />
                  }
                    
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title"> Read</h2>
                <div className="bookshelf-books">
                  {
                      <AllBooks
                         books = {allBooks.filter(b=>b.shelf === "read")}
                         onChangeShelf = {handleChangeShelf}/>
                  }
                    
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
