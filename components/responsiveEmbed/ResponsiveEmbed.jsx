import styles from './ResponsiveEmbed.module.css';

const ResponsiveEmbed = ({ videoId }) => {
  return (
    <div className={styles.embedContainer}>
      <iframe
        className={styles.embed}
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='YouTube Video'
      />
    </div>
  );
};

export default ResponsiveEmbed;
