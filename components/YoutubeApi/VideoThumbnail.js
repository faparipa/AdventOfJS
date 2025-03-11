import styles from './YoutubeApi.module.css';

export default function VideoThumbnail({ video, onClick }) {
  return (
    <li>
      <a className={styles.video} onClick={() => onClick(video.id.videoId)}>
        <img
          src={video.snippet.thumbnails.default.url}
          alt={video.snippet.title}
        />
        <h3>{video.snippet.title}</h3>
      </a>
    </li>
  );
}
