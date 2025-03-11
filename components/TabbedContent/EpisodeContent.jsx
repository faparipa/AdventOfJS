import styles from './Episode.module.css';
export default function EpisodeContent({ episode }) {
  return (
    <div key={episode.id} className={styles.main}>
      <div className={styles.cover}>
        <img src={`/${episode.cover}`} alt={`Episode ${episode.id}`} />
      </div>
      <div className={styles.content}>
        <h1 className={styles.mainTitle}>{episode.title}</h1>
        <p>{episode.description}</p>
        <a href={episode.link} className={styles.more}>
          More
        </a>
      </div>
    </div>
  );
}
