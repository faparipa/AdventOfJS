import styles from '@/app/2021/(challenges)/challenge2/challenge2.module.css';
import { memo } from 'react';

function PricePanel({ cartItems }) {
  if (!Array.isArray(cartItems)) {
    console.error('cartItems is not an array:', cartItems);
    return null;
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );
  const tax = subtotal * 0.0975;
  const total = subtotal + tax;

  return (
    <div className={styles.totals}>
      <div className={styles.lineItem}>
        <div className={styles.label}>Subtotal:</div>
        <div className={`${styles.amount} ${styles.price} ${styles.subtotal}`}>
          {(subtotal / 100).toFixed(2)}
        </div>
      </div>
      <div className={styles.lineItem}>
        <div className={styles.label}>Tax:</div>
        <div className={`${styles.amount} ${styles.price} ${styles.tax}`}>
          {(tax / 100).toFixed(2)}
        </div>
      </div>
      <div className={`${styles.lineItem} ${styles.total}`}>
        <div className={styles.label}>Total:</div>
        <div className={`${styles.amount} ${styles.price} ${styles.total}`}>
          {(total / 100).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default memo(PricePanel);
