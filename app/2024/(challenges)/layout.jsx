'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './layout.module.css';
import Links from '@/lib/links24';
import { usePathname } from 'next/navigation';

function Layout({ children }) {
  const path = usePathname();
  const lastPart = path.slice(path.lastIndexOf('/') + 1);
  const [activeLink, setActiveLink] = useState(lastPart);

  function handleActive(title) {
    const formatedTitle = title.replace(/\s+/g, '').toLowerCase();
    setActiveLink(formatedTitle);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.sidebar}>
        {Links.map((link) => (
          <li
            key={link.num}
            className={
              activeLink === link.title.replace(/\s+/g, '').toLowerCase()
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
            onClick={() => handleActive(link.title)}
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
