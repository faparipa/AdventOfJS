import styles from './tag.module.css';
const Tag = ({ text, handleTagDelete }) => {
  return (
    <div className={styles.tagBlock}>
      <span>{text}</span>
      <button onClick={handleTagDelete}>
        {/* <img
          src='/close.svg'
          alt='close'
          className={styles.icon}
          onClick={handleTagDelete}
        /> */}
        X
      </button>
    </div>
  );
};

export default Tag;
