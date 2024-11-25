import React, { useEffect } from "react";
import { useState } from "react";

import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import Summary from "./components/Summary";
import MovieDetails from "./components/MovieDetails";
import { Loading, ErrorMessage, ToggleBtn } from "./components/Additions";
import { useFetch } from "./hooks/useFetch";

const KEY = "a2cc76f6";
const url = `http://www.omdbapi.com/?apikey=${KEY}&`;

export default function App() {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isSearched, setIsSearched] = useState(false);

  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  if (!watched) {
    setWatched([]);
  }

  function handelSelect(id) {
    setSelectedId((selected) => (id === selected ? null : id));
  }

  function handelDetailsBack() {
    setSelectedId(null);
  }

  function handeladdWatched(movie) {
    // @ts-ignore
    setWatched((watched) => [...watched, movie]);
  }

  function handelDeleteWatched(id) {
    // @ts-ignore
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  useEffect(
    function () {
      setIsSearched((s) => (query.length < 3 ? false : true));
    },
    [query]
  );

  const { data, isPending, error } = useFetch(url + "s=" + query);

  return (
    <>
      <Navbar movies={data} query={query} setQuery={setQuery} />
      <main className="main">
        <div className="container-xl">
          <div className="row  flex-wrap-reverse g-5">
            <div className={isSearched ? "col-md-6" : "col"} id="watched-box">
              <div className="box">
                <ToggleBtn isOpen={isOpen2} setIsOpen={setIsOpen2}>
                  {selectedId ? (
                    <MovieDetails
                      movieId={selectedId}
                      closeButton={handelDetailsBack}
                      onAddWatch={handeladdWatched}
                      watched={watched}
                    />
                  ) : (
                    <>
                      <Summary watched={watched} />
                      <MovieList
                        movies={watched}
                        setSelectedId={handelSelect}
                        onDelete={handelDeleteWatched}
                      />
                    </>
                  )}
                </ToggleBtn>
              </div>
            </div>

            <div className={isSearched ? "col" : "d-none"} id="search-box">
              <div className="box">
                {isPending && <Loading />}

                {!isPending && !error && data?.Search && (
                  <ToggleBtn isOpen={isOpen1} setIsOpen={setIsOpen1}>
                    <MovieList
                      movies={data.Search}
                      setSelectedId={handelSelect}
                      onDelete={handelDeleteWatched}
                    />
                  </ToggleBtn>
                )}
                {error && <ErrorMessage message={error} />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
