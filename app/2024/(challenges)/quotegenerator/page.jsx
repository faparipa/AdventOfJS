import styles from './quotegenerator.module.css';
import { DM_Serif_Display } from 'next/font/google';

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400', // Specify the available weight
});

export default async function QuoteGenerator() {
  const data = await fetch('https://zenquotes.io/api/random');
  const quote = await data.json();
  //console.log(quote[0]);

  return (
    <div>
      <h2>Quote Generator:</h2>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={`${styles.quote} ${dmSerifDisplay.className}`}>
            <img src='/quotation-marks.svg' alt='quotation marks' />
            <span>{quote[0].q}</span>
          </div>
        </div>
        <p className={styles.author}>{quote[0].a}</p>
      </div>
    </div>
  );
}
