'use client';
import { useState } from 'react';
import styles from './TabbedContent.module.css';
import episodes from '@/lib/episodes';
import EpisodeContent from '@/components/TabbedContent/EpisodeContent';
import AsideContent from '@/components/TabbedContent/AsideContent';

export default function TabbedContentPage() {
  const [selectedEpisode, setSelectedEpisode] = useState(episodes[0].id);

  function handleSelect(id) {
    setSelectedEpisode(id);
  }
  // const handleEpisodeClick = (id) => () => handleSelect(id);

  return (
    <div className={styles.container}>
      {/* <div className={styles.wrapper}>
        <aside className={styles.aside}>
          <a
            href='http://compressed.fm'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src='/logo.svg' alt='Compressed.fm' />
          </a>
          <ul id='tabs'>
            {episodes.map((episode) => (
              <li
                className={selectedEpisod === episode.id ? styles.selected : ''}
                key={episode.id}
                onClick={handleEpisodeClick(episode.id)}
              >
                <a href='#'>
                  <div className={styles.episode}>Episode {episode.id}</div>
                  <div className={styles.title}>{episode.title}</div>
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <main>
          {episodes
            .filter((episode) => episode.id === selectedEpisod)
            .map((episode) => (
              <div key={episode.id} className={styles.main}>
                <div className={styles.cover}>
                  <img
                    src={`/${episode.cover}`}
                    alt={`Episode ${episode.id}`}
                  />
                </div>
                <div className={styles.content}>
                  <h1 className={styles.mainTitle}>{episode.title}</h1>
                  <p>{episode.description}</p>
                  <a href={episode.link} className={styles.more}>
                    More
                  </a>
                </div>
              </div>
            ))}
        </main>
      </div> */}

      <div className={styles.wrapper}>
        <AsideContent
          episodes={episodes}
          handleSelect={handleSelect}
          selectedEpisode={selectedEpisode}
        />
        <main>
          {episodes
            .filter((episode) => episode.id === selectedEpisode)
            .map((episode) => (
              <EpisodeContent key={episode.id} episode={episode} />
            ))}
        </main>
      </div>
    </div>
  );
}
