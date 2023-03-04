import "./reader.css";
import React, { useEffect, useState } from "react";

const Reader = ({ url }) => {
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    const fetchXhtmlDocument = async () => {
      try {
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
  }, [url]);

  return (
    <div id="r-reader" style={{ padding: "20px" }}>
      {errMsg && <p>{errMsg}</p>}
    </div>
  );
};

export default Reader;
