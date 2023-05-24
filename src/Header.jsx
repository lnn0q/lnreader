import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to={"/home/"}>lnreader</Link>
    </header>
  );
};

export default Header;
