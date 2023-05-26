import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Reader from "./Reader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [books, setBooks] = useState("");

  const apiUrl = "http://172.20.10.13:";
  const portHTTP = "5050";
  const portFTP = "5051";
  const tempUrl = apiUrl + portHTTP + "/api/v1/booklist/";
  const bookCoverFallback =
    "https://www.royalroad.com/dist/img/nocover-new-min.png";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // const response = await fetch(tempUrl);
        const response = await fetch(tempUrl);
        if (!response.ok) throw Error("Failed recieve data");
        let booksList = await response.json();
        console.log(booksList);
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
          path="/*"
          element={
            <Home
              isLoading={isLoading}
              fetchError={fetchError}
              books={books}
              bookCoverFallback={bookCoverFallback}
              apiUrl={apiUrl}
              portHTTP={portHTTP}
              portFTP={portFTP}
            />
          }
        />
        <Route
          path="/book/:id"
          element={
            <Reader
              isLoading={isLoading}
              books={books}
              apiUrl={apiUrl}
              portFTP={portFTP}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
