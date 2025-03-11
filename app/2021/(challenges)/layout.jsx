'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from './layout.module.css';
import Links from '@/lib/links21';
import { usePathname } from 'next/navigation';

function Layout({ children }) {
  const path = usePathname();
  const lastChar = path.slice(-1);
  const [activeLink, setActiveLink] = useState(lastChar);
  //console.log(path);

  function handleActive(num) {
    setActiveLink(num);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.sidebar}>
        {Links.map((link) => (
          <li
            key={link.num}
            className={
              activeLink === link.num
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
            onClick={() => handleActive(link.num)}
          >
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

export default Layout;
