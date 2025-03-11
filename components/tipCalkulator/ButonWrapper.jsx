import styles from './ButtonWrapper.module.css';

function ButtonWrapper({ onClick }) {
  return (
    <div className={styles['button-wrapper']}>
      <button className={styles.btn} onClick={onClick}>
        Calculate
      </button>
    </div>
  );
}

export default ButtonWrapper;
