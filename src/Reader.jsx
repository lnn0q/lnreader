import "./reader.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Reader = ({ books }) => {
  const { id } = useParams();
  const [errMsg, setErrMsg] = useState(null);
  const [bookUrl, setBookUrl] = useState(null);

  useEffect(() => {
    const fetchXhtmlDocument = async () => {
      try {
        if (books) {
          books.forEach((book) =>
            id === "" + book.id ? setBookUrl(book.book_src) : null
          );
        }
        if (bookUrl) {
          const response = await fetch(bookUrl);
          if (!response.ok) throw Error("Retrieving failed.");
          const xhtml = await response.text();
          const parser = new DOMParser();
          const xmlFile = await parser.parseFromString(
            xhtml,
            "application/xhtml+xml"
          );
          const xmlBody = await xmlFile.getElementsByTagName("body")[0];
          document.getElementById("r-reader").innerHTML = xmlBody.innerHTML;
        }
      } catch (err) {
        setErrMsg(err.message);
      }
    };

    fetchXhtmlDocument();
  }, [books, bookUrl]);

  return (
    <div id="r-reader" style={{ padding: "20px" }}>
      {!books ? <div>Loading...</div> : null}
      {errMsg && books ? errMsg && <p>{errMsg}</p> : null}
    </div>
  );
};

export default Reader;
