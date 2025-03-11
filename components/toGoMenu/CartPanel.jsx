import styles from '@/app/2021/(challenges)/challenge2/challenge2.module.css';

export default function CartPanel({
  cartItems,
  increaseQuantity,
  decreaseQuantity,
}) {
  if (!Array.isArray(cartItems)) {
    console.error('cartItems is not an array:', cartItems);
    return null;
  }

  return (
    <>
      {cartItems.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <>
          <h2 className={styles.title}>Your Cart</h2>
          <ul className={styles['cart-summary']}>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className={styles.plate}>
                  <img
                    src={`/${item.image}`}
                    alt={item.alt}
                    className={styles.plate}
                  />
                  <div className={styles.quantity}>{item.count}</div>
                </div>
                <div className={styles.content}>
                  <p className={styles.menuItem}>{item.name}</p>
                  <p className={styles.price}>
                    {(item.price / 100).toFixed(2)}
                  </p>

                  <div className={styles.quantityWrapper}>
                    <button
                      className={`${styles.cartbtn} ${styles.decrease}`}
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      {/* <img src='/chevron.svg' /> */}
                      &lt;
                    </button>
                    <div className={styles.quantity}>{item.count}</div>
                    <button
                      className={`${styles.cartbtn} ${styles.increase}`}
                      onClick={() => increaseQuantity(item.id)}
                    >
                      {/* <img src='/chevron.svg' /> */}
                      &gt;
                    </button>
                    <div className={styles.subtotal}>
                      {((item.price / 100) * item.count).toFixed(2)}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
