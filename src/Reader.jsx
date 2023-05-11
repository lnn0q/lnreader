import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Reader = ({ books }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const [bookUrl, setBookUrl] = useState(null);
  const [bookChapters, setBookChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(0);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        if (books) {
          books.forEach((book) =>
            id === "" + book.id ? setBookUrl(book.book_src + "") : null
          );
        }
        if (bookUrl) {
          const response = await fetch(bookUrl + "toc.ncx");
          if (!response.ok) throw Error("Retrieving failed.");
          const xml = await response.text();
          const parser = new DOMParser();
          const tocXml = parser.parseFromString(xml, "application/xml");
          let chapters = [];
          for (let navPoint of tocXml.querySelectorAll("navPoint")) {
            let chapterName =
              navPoint.querySelector("navLabel > text").textContent;
            let href = navPoint.querySelector("content").getAttribute("src");
            let playOrder = navPoint.getAttribute("playOrder");
            chapters.push({
              id: playOrder,
              name: chapterName,
              href: href,
            });
          }
          setBookChapters(chapters);
        }
      } catch (err) {
        setErrMsg(err.message);
        console.log(err.message);
      }
    };

    fetchChapters();
  }, [books, bookUrl]);

  useEffect(() => {
    const fetchXhtmlDocument = async () => {
      try {
        if (books && bookChapters[currentChapter]) {
          const response = await fetch(
            bookUrl + bookChapters[currentChapter].href
          );
          if (!response.ok) throw Error("Retrieving failed.");
          const xhtml = await response.text();
          const parser = new DOMParser();
          const xmlFile = parser.parseFromString(
            xhtml,
            "application/xhtml+xml"
          );
          const xmlBody = xmlFile.getElementsByTagName("body")[0];
          document.getElementById("r-reader").innerHTML = xmlBody.innerHTML;
          setIsLoading(false);
        }
      } catch (err) {
        setErrMsg(err.message);
        console.log(err.message);
      }
    };
    fetchXhtmlDocument();
  }, [bookChapters, currentChapter]);

  return (
    <>
      <article id="r-reader" style={{ padding: "20px" }}>
        {!books ? <div>Loading...</div> : null}
        {errMsg && books ? errMsg && <p>{errMsg}</p> : null}
      </article>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "10px",
        }}
      >
        {currentChapter !== 0 && !isLoading && !errMsg ? (
          <button
            onClick={() => {
              setCurrentChapter(currentChapter - 1);
              window.scrollTo(0, 0);
            }}
          >
            Prev
          </button>
        ) : null}
        {currentChapter !== bookChapters.length && !isLoading && !errMsg ? (
          <button
            onClick={() => {
              setCurrentChapter(currentChapter + 1);
              window.scrollTo(0, 0);
            }}
          >
            Next
          </button>
        ) : null}
      </nav>
    </>
  );
};

export default Reader;
