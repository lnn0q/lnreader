import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Reader from "./Reader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [books, setBooks] = useState("");

  const apiUrl = "http://192.168.88.178:5174/books/";
  const bookCoverFallback =
    "https://www.royalroad.com/dist/img/nocover-new-min.png";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw Error("Failed recieve data");
        const booksList = await response.json();
        setBooks(booksList);
        setIsLoading(false);
        setFetchError(null);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLoading={isLoading}
              fetchError={fetchError}
              books={books}
              bookCoverFallback={bookCoverFallback}
            />
          }
        />
        <Route
          path="/book/:id"
          element={<Reader isLoading={isLoading} books={books} />}
        />
      </Routes>
    </>
  );
}

export default App;
