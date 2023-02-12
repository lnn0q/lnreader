import React, { useState, useEffect } from 'react'
import Reader from './Reader'

const Content = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [books, setBooks] = useState('');
  const [bookUrl, setBookUrl] = useState('');
  const [isReading, setIsReading] = useState(false);

  const apiUrl = 'http://localhost:3500/books/'

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(apiUrl);
        if(!response.ok) throw Error('Failed recieve data');
        const booksList = await response.json()
        setBooks(booksList);
        setIsLoading(false);
        setFetchError(null);
      }
      catch (err) {
        console.log(err.message);
      }
    }
    fetchBooks();
  }, [])

  const readerOpen = (bookSrc) => {
    setBookUrl(bookSrc);
    setIsReading(true);
  }
  return (
    <div style={{height: '100vh'}}>
      {isReading && <Reader bookUrl={bookUrl}/>}
      
      {isLoading && <p style={{color: 'green'}}>Loading your books...</p>}
      {fetchError && <p style={{color: 'red'}}>{`{$fetchError}`}</p>}

      {!isReading && !isLoading && !fetchError &&
        <main className='booksGrid'>
          {books.map((book) => (
            <div className='bookPreviewContainer' key={book.id}>
              <div className='coverContainer'>
                <img src={book.cover_src}/>
              </div>
              <label>{book.title}</label>
              <button onClick={()=>{readerOpen(book.book_src)}}>Read</button>
            </div>
          ))}
        </main>
      }
    </div>
  )
}

export default Content