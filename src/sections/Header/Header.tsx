import React, { FC } from "react";

export const Header: FC = () => {
  return (
    <header>
      <nav>
        <span className="logo">TiPi</span>
        <div className="links">
          <p>
            <a href="#main">About</a>
          </p>
          <p>
            <a href="#layers">Design</a>
          </p>
          <p>
            <a href="#contact">Contact</a>
          </p>
        </div>
      </nav>
      <h1>A place where your dream design will come through.</h1>
      <p className="text">
        Our quick design app allows you to check some of the projects that our
        top designers prepared for you! You may find something you like, or it
        may inspire you to create your own custom made project of your dream
        kitchen!
      </p>
    </header>
  );
};
