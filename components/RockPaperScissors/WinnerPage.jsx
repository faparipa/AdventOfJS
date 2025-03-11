import styles from './WinnerPage.module.css';

export default function WinnerPage({
  userChoice,
  computerChoice,
  result,
  playAgain,
}) {
  return (
    <div className={styles.countiner}>
      <div
        className={`${
          result === 'Computer wins'
            ? styles['w-computer-wins']
            : styles['w-you-win']
        }`}
      >
        <div className={styles.wrapper}>
          <div className={styles['your-pick']}>
            {/* Display user result */}
            <h1 className={styles['you-win']}>
              {result === 'You win'
                ? 'You win!'
                : result === "It's a tie!"
                ? "It's a tie!"
                : ''}
            </h1>
            <img
              className={styles.winnerImg}
              src={`/${userChoice}.png`}
              alt={userChoice.charAt(0).toUpperCase() + userChoice.slice(1)}
            />
          </div>
          <div className={styles['computer-pick']}>
            {/* Display computer result */}
            <h1 className={styles['computer-wins']}>
              {result === 'Computer wins'
                ? 'Computer wins!'
                : result === "It's a tie!"
                ? "It's a tie!"
                : ''}
            </h1>
            <img
              className={styles.winnerImg}
              src={`/${computerChoice}.png`}
              alt={
                computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
              }
            />
          </div>
          <button className={styles['play-again']} onClick={playAgain}>
            Play again?
          </button>
        </div>
      </div>
    </div>
  );
}
