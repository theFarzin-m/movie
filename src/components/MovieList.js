import React from "react";

export default function MovieList({ movies, setSelectedId, onDelete }) {
    return (
      <ul className="list list-movies">
        {movies.map((movie) => (
          <li key={movie.imdbID} onClick={() => setSelectedId(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
              {movie.imdbRating && (
                <p>
                  <span>⭐️</span>
                  <span>{movie.imdbRating}</span>
                </p>
              )}
  
              {movie.userRating ? (
                <p>
                  <span>🌟</span>
                  <span>{movie.userRating}</span>
                </p>
              ) : (
                <p>
                  <span>📅</span>
                  <span>{movie.Year}</span>
                </p>
              )}
  
              {movie.runtime && (
                <p>
                  <span>⏳</span>
                  <span>{movie.runtime} min</span>
                </p>
              )}
  
              {movie.userRating && (
                <p>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(movie.imdbID)}
                  >
                    X
                  </button>
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }