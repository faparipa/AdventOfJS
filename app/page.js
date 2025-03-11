import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
      <Link className={styles.linkTo} href='https://www.adventofjs.com/'>
        More info: Advent of JavaScript
      </Link>
      <main>
        <img src='/firstpage.jpg' alt='bacground image' />
      </main>
    </div>
  );
}
