'use client';
import Movies from '@/components/favoritmovie/movies';
import SearchInput from '@/components/favoritmovie/searchInput';
import MOVIS from '@/favoritemovies.json';
import styles from './favoritemovie.module.css';
import { useState } from 'react';

export default function FavoriteMoviePage({ searchParams }) {
  const [search, setSearch] = useState('');
  //const query = (await searchParams).query;
  //const params = { search: query || null };
  //console.log(params);
  //console.log(search);

  const movies = MOVIS.filter((movie) =>
    movie.Title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Movie Picker</h2>
      <SearchInput search={search} setSearch={setSearch} />
      <Movies movies={movies} />
    </div>
  );
}
