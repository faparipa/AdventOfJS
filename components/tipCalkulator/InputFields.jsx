import styles from './InputFields.module.css';

function InputFields({
  billAmount,
  numberOfPeople,
  onBillAmountChange,
  onNumberOfPeopleChange,
}) {
  return (
    <div className={styles['input-fields']}>
      <div className={styles['bill-amount']}>
        <div className={styles.field}>
          <input
            className={styles.textInput}
            type='number'
            min={1}
            value={billAmount}
            onChange={onBillAmountChange}
          />
        </div>
        <div className={styles.fieldLabel}>Bill Amount</div>
      </div>
      <div className={styles['number-of-people']}>
        <div className={styles.field}>
          <input
            className={styles.textInput}
            type='number'
            min={1}
            value={numberOfPeople}
            onChange={onNumberOfPeopleChange}
          />
        </div>
        <div className={styles.fieldLabel}>Number of People</div>
      </div>
    </div>
  );
}

export default InputFields;
