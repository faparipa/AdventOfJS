'use client';
import { useState, useEffect, Suspense } from 'react';
import Movies from '@/components/favoritmovie/movies';
import MOVIES from '@/favoritemovies.json';

function InfiniteScrollPage() {
  const maxMovies = 100;
  const initialMovies = 15;

  const [displayedMovies, setDisplayedMovies] = useState(
    MOVIES.slice(0, initialMovies)
  );
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false); // Állapot a loading szöveghez

  const loadMoreMovies = () => {
    if (loading || displayedMovies.length >= maxMovies) return;
    console.log('loading....');

    setShowLoading(true); // Mutassuk a "Loading..." feliratot
    setLoading(true);

    // 1 másodperces késleltetés, hogy a "Loading..." felirat látszódjon
    setTimeout(() => {
      const nextMovies = MOVIES.slice(
        displayedMovies.length,
        displayedMovies.length + initialMovies
      );
      setDisplayedMovies((prevMovies) => [...prevMovies, ...nextMovies]);
      setLoading(false);
      setShowLoading(false); // Rejtsük el a "Loading..." feliratot
    }, 1000); // 1 másodperces késleltetés
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100
      ) {
        loadMoreMovies();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, displayedMovies.length]);

  return (
    <div>
      <h2>Infinite Scroll</h2>

      <Movies movies={displayedMovies} maxMovies={maxMovies} />
    </div>
  );
}

export default InfiniteScrollPage;
