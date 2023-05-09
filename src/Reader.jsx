import "./reader.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Reader = ({ isLoading, books }) => {
  const { id } = useParams();
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    const fetchXhtmlDocument = async () => {
      try {
        let url;
        books.forEach((book) =>
          id === "" + book.id ? (url = book.book_src) : null
        );
        const response = await fetch(url);
        if (!response.ok) throw Error("Retrieving failed.");
        const xhtml = await response.text();
        const parser = new DOMParser();
        const xmlFile = await parser.parseFromString(
          xhtml,
          "application/xhtml+xml"
        );
        const xmlBody = await xmlFile.getElementsByTagName("body")[0];
        document.getElementById("r-reader").innerHTML = xmlBody.innerHTML;
      } catch (err) {
        setErrMsg(err.message);
      }
    };

    fetchXhtmlDocument();
  }, [books]);

  return (
    <div id="r-reader" style={{ padding: "20px" }}>
      {isLoading && <div>Loading...</div>}
      {!isLoading && errMsg ? errMsg && <p>{errMsg}</p> : null}
    </div>
  );
};

export default Reader;
