import styles from './TipAmount.module.css';

function TipAmount({ tipAmount }) {
  return (
    <div className={styles['tip-amount']}>
      <div className={styles.label}>Tip Amount</div>
      <div className={styles.dollars}>
        <sup>$</sup>
        <span>{tipAmount}</span>
      </div>
    </div>
  );
}

export default TipAmount;
