'use client';
import { useState } from 'react';
import styles from './episode.module.css';

export default function Episodes({ episodes }) {
  const [selectedEpisodes, setSelectedEpisodes] = useState([]);
  const [lastSelected, setLastSelected] = useState(null); // To track the last selected episode

  const handleClick = (e, episodeId) => {
    const isShiftPressed = e.shiftKey; // Check if Shift key is pressed

    if (lastSelected === null) {
      // If lastSelected is null, this is the first click, so just select the current episode
      setSelectedEpisodes((prevSelected) => {
        const newSelected = [...prevSelected, episodeId];

        return newSelected;
      });
      setLastSelected(episodeId); // Set the current episode as the last selected
      return;
    }

    if (isShiftPressed) {
      // If Shift key is pressed, select all episodes between the last and the current
      const start = Math.min(lastSelected, episodeId); // Correct range start
      const end = Math.max(lastSelected, episodeId); // Correct range end

      const range = [];
      for (let i = start; i <= end; i++) {
        range.push(i);
      }

      setSelectedEpisodes((prevSelected) => {
        const newSelection = [...new Set([...prevSelected, ...range])];

        return newSelection;
      });
    } else {
      // If Shift key is not pressed, just toggle the selected episode
      setSelectedEpisodes((prevSelected) => {
        const newSelected = prevSelected.includes(episodeId)
          ? prevSelected.filter((id) => id !== episodeId)
          : [...prevSelected, episodeId];

        return newSelected;
      });
    }

    // Update the last selected episode after updating selectedEpisodes
    setLastSelected(episodeId);
  };

  // Handle Select All button click
  const handleSelectAll = () => {
    if (selectedEpisodes.length === episodes.length) {
      // Deselect all
      setSelectedEpisodes([]);
    } else {
      // Select all
      setSelectedEpisodes(episodes.map((episode) => episode.id));
    }
  };

  return (
    <>
      <button id='selectAll' className={styles.btn} onClick={handleSelectAll}>
        {selectedEpisodes.length === episodes.length
          ? 'Deselect All'
          : 'Select All'}
      </button>
      <ul className={styles.episodes}>
        {episodes.map((episode) => (
          <li key={episode.id} className={styles.episode}>
            <label htmlFor={`episode-${episode.id}`} className={styles.label}>
              <input
                type='checkbox'
                name={`episode-${episode.id}`}
                id={`episode-${episode.id}`}
                className={styles.checkbox}
                checked={selectedEpisodes.includes(episode.id)} // This controls the checked state
                onClick={(e) => handleClick(e, episode.id)} // Use onClick for Shift+Click behavior
                onChange={() => {}} // Empty onChange to avoid React warning
              />
              <span>
                {episode.id} || {episode.name}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
