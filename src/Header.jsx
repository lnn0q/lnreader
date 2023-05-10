import React from "react";
import { Link } from "react-router-dom";

import Home from "./Home";

const Header = () => {
  return (
    <header>
      <Link to={"/"}>lnreader</Link>
    </header>
  );
};

export default Header;

