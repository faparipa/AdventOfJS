import Links from '@/lib/links';
import Link from 'next/link';
import styles from './layout.module.css';
function layout({ children }) {
  return (
    <div className={styles.container}>
      <ul className={styles.sidebar}>
        {Links.map((link) => (
          <li key={link.num} className={styles.link}>
            <Link href={link.href}>
              <p>Challange #{link.num}</p>
              <h3>{link.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

export default layout;
