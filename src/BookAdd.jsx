import { useState } from "react";
import { Link } from "react-router-dom";

const BookAdd = ({ apiUrl, portHTTP }) => {
  const [bookFile, setBookFile] = useState(null);

  const postBook = async () => {
    try {
      const bookData = new FormData();
      bookData.append("book_src", bookFile);
      const response = await fetch(apiUrl + portHTTP + "/api/v1/bookpost/", {
        method: "POST",
        body: bookData,
      });
      if (!response.ok) throw Error("Failed recieve data");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="addBook-modal">
      <div className="addBook-modal-in">
        <label>Select your e-pub file</label>
        <input type="file" onChange={(e) => setBookFile(e.target.files[0])} />
        <div className="addBook-button-container">
          <Link to="/home">
            <button
              onClick={() => {
                postBook();
              }}
            >
              Add
            </button>
          </Link>
          <Link to="/home">
            <button>Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookAdd;
