'use client';
import { useState } from 'react';
import styles from './floatingactionbutton.module.css';

export default function FloatingActionButton() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.container}>
      <div className={styles.icons}>
        {expanded && (
          <div className={styles.socialIcons}>
            <img src='/youtube.svg' alt='youtube' className={styles.icon1} />
            <img src='/github.svg' alt='github' className={styles.icon2} />
            <img
              src='/instagram.svg'
              alt='instagram'
              className={styles.icon3}
            />
            <img src='/threads.svg' alt='threads' className={styles.icon4} />
            <img src='/bluesky.svg' alt='bluesky' className={styles.icon5} />
          </div>
        )}
        <div className={styles.fab} onClick={toggleExpansion}>
          <img
            src={expanded ? '/close.svg' : '/megaphone.svg'}
            alt={expanded ? 'close' : 'megaphone'}
          />
        </div>
      </div>
    </div>
  );
}
