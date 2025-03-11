import styles from '@/app/2021/(challenges)/challenge2/challenge2.module.css';
import Image from 'next/image';

export default function MenuPanel({ menuItems, addToCart, cartItems }) {
  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>To Go Menu</h2>
      <ul className={styles.menu}>
        {menuItems.map((item) => {
          const isInCart = cartItems.some(
            (cartItem) => cartItem.id === item.id
          );
          return (
            <li key={item.id}>
              <div className={styles.plate}>
                <Image
                  src={`/${item.image}`}
                  alt={item.alt}
                  width={148}
                  height={148}
                />
              </div>
              <div className={styles.content}>
                <p className={styles['menu-item']}>{item.name}</p>
                <p className={styles.price}>{item.price / 100}</p>
                {!isInCart ? (
                  <button
                    className={styles.btn}
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    className={`${styles.btn} ${styles.inCart}`}
                    onClick={() => addToCart(item)}
                  >
                    In Cart
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
