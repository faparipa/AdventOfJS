import styles from './TotalPerPerson.module.css';

function TotalPerPerson({ totalPerPerson }) {
  return (
    <div className={styles['total-per-person']}>
      <div className={styles.label}>Total Per Person</div>
      <div className={styles.dollars}>
        <sup>$</sup>
        <span>{totalPerPerson}</span>
      </div>
    </div>
  );
}

export default TotalPerPerson;
