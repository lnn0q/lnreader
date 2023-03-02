import React from "react";
import DisplayXhtmlDocument from "./DisplayXhtmlDocument";

const App = () => {
  return (
    <div>
      <h1>Displaying an XHTML Document</h1>
      <DisplayXhtmlDocument
        url="http://localhost/Worth%20the%20Candle_split_000.xhtml"
        elId="di1"
      />
    </div>
  );
};

export default App;
