import styles from './Aside.module.css';

export default function AsideContent({
  episodes,
  handleSelect,
  selectedEpisode,
}) {
  return (
    <aside className={styles.aside}>
      <a href='http://compressed.fm' target='_blank'>
        <img src='/logo.svg' alt='Compressed.fm' />
      </a>
      <ul id='tabs'>
        {episodes.map((episode) => (
          <li
            className={selectedEpisode === episode.id ? styles.selected : ''}
            key={episode.id}
            onClick={() => handleSelect(episode.id)}
          >
            <a href='#'>
              <div className={styles.episode}>Episode {episode.id}</div>
              <div className={styles.title}>{episode.title}</div>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
