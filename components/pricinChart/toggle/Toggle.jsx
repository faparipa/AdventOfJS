import styles from './toggle.module.css';

function Toggle({ togglePlan, before, after, checked }) {
  return (
    <>
      <span>{before}</span>
      <label className={styles.switch}>
        <input type='checkbox' onChange={togglePlan} checked={checked} />
        <span className={styles.slider}></span>
      </label>
      <span>{after}</span>
    </>
  );
}

export default Toggle;
