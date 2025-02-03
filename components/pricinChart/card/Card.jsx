import styles from './Card.module.css';

function Card({ card }) {
  return (
    <div className={styles.card}>
      <div className={styles.priceContainer}>
        <p className={styles.price}>
          <sup>$</sup>
          {card.price}
        </p>
        <p className={styles.perMonth}>
          Per month with annual subscription discount; ${card.price * 12} billed
          up front. ${card.price + 2} if billed monthly
        </p>
      </div>
      <hr className={styles.line} />
      <div className={styles.wrapper}>
        <h3>{card.title}</h3>
        <p>{card.for}</p>

        <ul>
          {Object.keys(card.description).map((key) => (
            <li key={key} className={styles.description}>
              <img
                className={styles.check}
                src='/circle-check.svg'
                alt='circle check'
              />
              <p>{card.description[key]}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Card;
