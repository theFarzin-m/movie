import React, { useState, useEffect } from "react";

import StarRating from "./StarRating";
import { ErrorMessage, Loading } from "./Additions";
import { useFetch } from "../hooks/useFetch";
import { TiArrowLeft } from "react-icons/ti";

const KEY = "a2cc76f6";
const url = `http://www.omdbapi.com/?apikey=${KEY}&`;

export default function MovieDetails({
  movieId,
  closeButton,
  onAddWatch,
  watched,
}) {
  const [userRating, setUserRating] = useState(0);
  const [moviedetails, setMovieDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isWatched = watched.map((watched) => watched.imdbID).includes(movieId);
  const watchedUserRating = watched.find((movie) => movie.imdbID === movieId)
    ?.userRating;

  const {
    // @ts-ignore
    Title,
    // @ts-ignore
    Year,
    // @ts-ignore
    Poster,
    // @ts-ignore
    Runtime,
    // @ts-ignore
    imdbRating,
    // @ts-ignore
    Plot,
    // @ts-ignore
    Released,
    // @ts-ignore
    Actors,
    // @ts-ignore
    Director,
    // @ts-ignore
    Genra,
  } = moviedetails;

  const { data, isPending, error } = useFetch(url + "i=" + movieId);
  useEffect(() => {
    if (data) setMovieDetails(data);
  }, [data]);

  useEffect(
    function () {
      if (!Title) return;
      document.title = Title;

      return function () {
        document.title = "Movies";
      };
    },
    [Title]
  );

  function handelAdd() {
    const newWatchedMovie = {
      imdbID: movieId,
      Title,
      Year,
      Poster,
      imdbRating: Number(imdbRating),
      runtime: Number(Runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatch(newWatchedMovie);
    closeButton();
  }

  return (
    <div className="details">
      {isLoading && <Loading />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back d-flex justify-content-center align-items-center" onClick={closeButton}>
            <TiArrowLeft />
            </button>
            <img src={Poster} alt={`poster of ${Title}`} />
            <div className="details-overview">
              <h2> {Title} </h2>
              <p>
                {Released} &bull; {Runtime}
              </p>
              <p> {Genra} </p>
              <p>
                <span>⭐️</span>
                {imdbRating} imdb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating maxRating={10} onRating={setUserRating} />
                  {userRating ? (
                    <button className="btn-add" onClick={handelAdd}>
                      + Add to Watchlist
                    </button>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <p> You rated this one with {watchedUserRating}⭐️ </p>
              )}
            </div>

            <p>
              <em> {Plot} </em>
            </p>
            <p> Staring: {Actors} </p>
            <p> Directed by {Director} </p>
          </section>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
