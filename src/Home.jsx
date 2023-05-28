import { Routes, Route, Link } from "react-router-dom";
import BookAdd from "./BookAdd";

const Home = ({
  isLoading,
  fetchError,
  books,
  bookCoverFallback,
  apiUrl,
  portHTTP,
  portFTP,
  isRemoveMode,
  setRemoveMode,
  handleRemoveCheck,
  handleConfirmRemove,
  handleDeclineRemove,
  endpointPOST,
}) => {
  return (
    <>
      {isLoading && (
        <p
          style={{
            color: "#a6da95",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading your books...
        </p>
      )}
      {fetchError && <p style={{ color: "#ed8796" }}>{`{$fetchError}`}</p>}
      {!isLoading && !fetchError && (
        <main>
          <div className="booksGrid">
            {books.map((book) => (
              <div className="bookPreviewContainer" key={book.id}>
                <img
                  className="bookCoverContainer"
                  src={
                    book.cover_src !== null
                      ? apiUrl + portFTP + book.cover_src
                      : bookCoverFallback
                  }
                />
                <label>{book.title}</label>
                <Link to={`/book/${book.id}`}>
                  <button>Read</button>
                </Link>
                {isRemoveMode ? (
                  <input
                    type={"checkbox"}
                    className="removeBook-checkbox"
                    onChange={() => {
                      handleRemoveCheck(book.id);
                    }}
                  />
                ) : null}
              </div>
            ))}
          </div>
          {!isRemoveMode ? (
            <button
              className="removeBook-button"
              onClick={() => {
                setRemoveMode(true);
              }}
            >
              <div className="removeBook-icon">&#xf0a97;</div>
            </button>
          ) : (
            <>
              <button
                className="removeBook-button removeBook-conf"
                onClick={() => {
                  handleConfirmRemove();
                }}
              >
                <div className="removeBook-icon">&#xf00c;</div>
              </button>
              <button
                className="removeBook-button removeBook-decl"
                onClick={() => {
                  handleDeclineRemove();
                }}
              >
                <div className="removeBook-icon">&#xf00d;</div>
              </button>
            </>
          )}
          <Link to="add-book">
            <button className="addBook-button">
              <div className="addBook-icon">&#xf0eed;</div>
            </button>
          </Link>
          <Routes>
            <Route
              path="add-book"
              element={
                <BookAdd
                  apiUrl={apiUrl}
                  portHTTP={portHTTP}
                  endpointPOST={endpointPOST}
                />
              }
            />
          </Routes>
        </main>
      )}
    </>
  );
};

export default Home;
