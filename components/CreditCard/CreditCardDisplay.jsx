import styles from './CreditCardDisplay.module.css';
const CreditCardDisplay = ({ cardDetails, cardType, isFlipped }) => {
  const renderCardInfo = (label, value, fallback) => (
    <div className={styles[label]}>
      <div className={styles.shadow}>{value || fallback}</div>
      <div className={styles.emboss}>{value || fallback}</div>
    </div>
  );

  const renderExpirationDate = () => {
    const { expirationMonth, expirationYear } = cardDetails;
    const expiration =
      expirationMonth && expirationYear
        ? `${expirationMonth.padStart(2, '0')}/${expirationYear}`
        : '12/2022';
    return renderCardInfo('expiration-date', expiration, '12/2022');
  };

  return (
    <div
      className={`${styles['credit-card__wrapper']} ${styles[cardType]} ${
        isFlipped ? styles.flip : ''
      }`}
    >
      <div className={styles['credit-card__inner']}>
        <div className={styles['credit-card--front']}>
          {renderCardInfo(
            'card-number',
            cardDetails.cardNumber,
            '4242 4242 4242 4242'
          )}
          {renderCardInfo('card-holder', cardDetails.cardHolder, 'Jone Doe')}
          {renderExpirationDate()}
        </div>
        <div className={styles['credit-card--back']}>
          <div className={styles.signature}>
            {cardDetails.cardHolder || 'Amy Dutton'}
          </div>
          <div className={styles.cvv}>{cardDetails.cvv || '123'}</div>
        </div>
      </div>
    </div>
  );
};
export default CreditCardDisplay;
