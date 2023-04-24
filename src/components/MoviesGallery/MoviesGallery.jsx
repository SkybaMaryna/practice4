import React from 'react';

export const MoviesGallery = ({ movies, onDelete, openModal }) => {
  return (
    <ul>
      {movies.map(({ id, title, vote_count, poster_path }) => {
        return (
          <li key={id}>
            <h2>{title}</h2>
            <p>Votes: {vote_count}</p>
            <button
              type="button"
              onClick={() => {
                onDelete(id);
              }}
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                openModal({ src: poster_path, alt: title });
              }}
            >
              Show poster
            </button>
          </li>
        );
      })}
    </ul>
  );
};
