import { Link } from "react-router-dom";

const Home = ({ isLoading, fetchError, books, bookCoverFallback }) => {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      {isLoading && (
        <p
          style={{
            color: "green",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading your books...
        </p>
      )}
      {fetchError && <p style={{ color: "red" }}>{`{$fetchError}`}</p>}
      {!isLoading && !fetchError && (
        <main>
          <div className="booksGrid">
            {books.map((book) => (
              <div className="bookPreviewContainer" key={book.id}>
                <img
                  className="bookCoverContainer"
                  src={
                    book.cover_src.length !== 0
                      ? book.cover_src
                      : bookCoverFallback
                  }
                />
                <label>{book.title}</label>
                <Link to={`/book/${book.id}`}>
                  <button>Read</button>
                </Link>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
};

export default Home;
