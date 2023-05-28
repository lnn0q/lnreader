import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Reader from "./Reader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [books, setBooks] = useState("");

  const [isRemoveMode, setRemoveMode] = useState(false);
  const [removeChecked, setRemoveChecked] = useState(new Set());

  const apiUrl = "http://192.168.88.178:";
  const portHTTP = "5050";
  const portFTP = "5051";
  const endpointGET = "/books/";
  const endpointPOST = "";
  const endpointDELETE = "/books/";

  // const apiUrl = "http://192.168.88.178:";
  // const portHTTP = "5050";
  // const portFTP = "5051";
  // const endpointGET = "/api/v1/booklist/";
  // const endpointPOST = "/api/v1/bookpost/";
  // const endpointDELETE = "/api/v1/bookdelete/";

  const bookCoverFallback =
    "https://www.royalroad.com/dist/img/nocover-new-min.png";

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(apiUrl + portHTTP + endpointGET);
      if (!response.ok) throw Error("Failed recieve data");
      let booksList = await response.json();
      setBooks(booksList);
      setIsLoading(false);
      setFetchError(null);
    } catch (err) {
      console.log(err.message);
    }
  };

  // removeBook functions

  const handleRemoveCheck = (id) => {
    const updatedRemoveChecked = new Set(removeChecked);
    if (updatedRemoveChecked.has(id)) {
      updatedRemoveChecked.delete(id);
    } else {
      updatedRemoveChecked.add(id);
    }
    setRemoveChecked(updatedRemoveChecked);
  };

  const handleConfirmRemove = async () => {
    removeChecked.forEach(async (id) => {
      try {
        const response = await fetch(
          apiUrl + portHTTP + endpointDELETE + `${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw Error("Failed recieve data");
        fetchBooks();
        setRemoveMode(false);
      } catch (err) {
        console.log(err.message);
      }
    });
  };

  const handleDeclineRemove = () => {
    setRemoveMode(false);
    setRemoveChecked(new Set());
  };

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
              fetchBooks={fetchBooks}
              books={books}
              bookCoverFallback={bookCoverFallback}
              apiUrl={apiUrl}
              portHTTP={portHTTP}
              portFTP={portFTP}
              endpointPOST={endpointPOST}
              isRemoveMode={isRemoveMode}
              setRemoveMode={setRemoveMode}
              handleRemoveCheck={handleRemoveCheck}
              handleConfirmRemove={handleConfirmRemove}
              handleDeclineRemove={handleDeclineRemove}
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
