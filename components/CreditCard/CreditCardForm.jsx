import styles from './CreditCardForm.module.css';

const CreditCardForm = ({
  formAction,
  cardDetails,
  handleInputChange,
  handleCardNumberChange,
  handleCvvFocus,
  handleCvvBlur,
}) => {
  return (
    <form action={formAction}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor='card-number'>
            Card Number
          </label>
          <input
            required
            type='text'
            name='cardNumber'
            value={cardDetails.cardNumber}
            onChange={handleCardNumberChange}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor='card-holder'>
            Card Holder
          </label>
          <input
            required
            type='text'
            name='cardHolder'
            value={cardDetails.cardHolder}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={`${styles.field} ${styles.option__wrapper}`}>
          <label className={styles.label}>Expiration Date</label>
          <div className={styles['field__option']}>
            <select
              required
              className={styles.select}
              name='expirationMonth'
              value={cardDetails.expirationMonth}
              onChange={handleInputChange}
            >
              <option>Month</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={String(i + 1).padStart(2, '0')}>
                  {String(i + 1).padStart(2, '0')}
                </option>
              ))}
            </select>

            <select
              className={styles.select}
              name='expirationYear'
              value={cardDetails.expirationYear}
              onChange={handleInputChange}
              required
            >
              <option>Year</option>
              {[...Array(10)].map((_, i) => {
                const year = 2021 + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor='cvv'>
            CVV
          </label>
          <input
            type='number'
            name='cvv'
            value={cardDetails.cvv}
            onChange={handleInputChange}
            onFocus={handleCvvFocus}
            onBlur={handleCvvBlur}
            maxLength={3}
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <button className={styles.btn}>Submit</button>
      </div>
    </form>
  );
};
export default CreditCardForm;
