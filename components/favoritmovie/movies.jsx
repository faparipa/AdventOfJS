'use client';
import { useEffect } from 'react';
import styles from './movies.module.css';

export default function Movies({ movies, maxMovies }) {
  console.log('movies:', movies.length);

  return (
    <div className={styles.container}>
      <ul className={styles.menu}>
        {movies.map((movie) => (
          <li key={movie.Position} className={styles.menu_item}>
            <img src={movie.Image} alt={movie.Title} />
            <div className={styles.movie_details}>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          </li>
        ))}
      </ul>
      {movies.length >= maxMovies ? (
        <p>No more movies to load.</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
// "Description": "A young man inadvertently breaks three important rules concerning his new pet and unleashes a horde of malevolently mischievous monsters on a small town.",
//     "Director": "Joe Dante",
//     "Duration": "1h 46m",
//     "Image": "https://m.media-amazon.com/images/M/MV5BYmMzMmIxNzYtYjk3OS00NjBiLTkxNDQtODU3ZDNjN2RiMTIxXkEyXkFqcGc@._V1_QL75_UX140_CR0,1,140,207_.jpg",
//     "Image Alt": "Zach Galligan and Howie Mandel in Gremlins (1984)",
//     "Metascore": "70",
//     "Movie Link": "https://www.imdb.com/title/tt0087363/?ref_=ls_i_10",
//     "Position": "11",
//     "Rating": "7.3",
//     "Stars": "Zach Galligan",
//     "Title": "10. Gremlins",
//     "Votes": "(255K)",
//     "Year": "1984"
