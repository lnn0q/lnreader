import React, { useState, useEffect } from 'react'
import Reader from './Reader'

const Content = () => {
  let isReading = false;
  
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [books, setBooks] = useState('');

  const apiUrl = 'http://localhost:3500/books/'

  let bookUrl

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

  return (
    <main>
      {isReading && <Reader bookUrl={bookUrl}/>}
      
      {isLoading && <p style={{color: 'green'}}>Loading your books...</p>}
      {fetchError && <p style={{color: 'red'}}>{`{$fetchError}`}</p>}

      {!isReading && !isLoading && !fetchError &&
        <div className='booksGrid'>
          {books.forEach(() => (
            <div>book</div>
          ))}
        </div>
      }
    </main>
  )
}

export default Content