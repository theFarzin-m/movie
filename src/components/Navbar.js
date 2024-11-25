import React, { useEffect, useRef, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

export default function Navbar({ query, setQuery, movies }) {
  const inputEl = useRef(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter") {
          // @ts-ignore
          inputEl.current.focus();
          // @ts-ignore
          inputEl.current.value = "";
        }
      }

      document.addEventListener("keydown", callback);
      return () => document.removeEventListener("keydown", callback);
    },
    [setQuery]
  );
  // @ts-ignore
  useEffect(() => inputEl.current.focus(), []);

  function queryHandeler(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="container-xl">
      <nav className="nav-bar">
        <div className="logo">
          <img src="/movie-camera.png" alt="Logo" />
          <h1>Movie Details</h1>
        </div>
        <button
          className="btn border-0 fs-1 text-light me-4 d-block d-md-none"
          onClick={() => setShowSearch(true)}
        >
          <HiOutlineMagnifyingGlass />
          Search
        </button>
        <div className={`search px-2 py-2 rounded ${showSearch ? "show" : ""}`}>
          <span
            className="d-inline d-md-none rounded-circle bg-danger ms-2 px-2 py-1"
            onClick={() => setShowSearch(false)}
          >
            X
          </span>
          <input
            type="text"
            placeholder="Search movies..."
            onKeyUp={(e) => queryHandeler(e)}
            ref={inputEl}
          />
        </div>
        <p className="num-results d-none d-md-block">
          Found <strong> {movies ? movies.length : "0"} </strong> results
        </p>
      </nav>
    </div>
  );
}
