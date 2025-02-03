'use client';
import { useLayoutEffect, useRef } from 'react';
import styles from './texare.module.css';

export default function RTAPage() {
  const textbox = useRef(null);

  function adjustHeight() {
    textbox.current.style.height = 'inherit';
    textbox.current.style.height = `${textbox.current.scrollHeight}px`;
  }

  useLayoutEffect(adjustHeight, []);

  function handleKeyDown(e) {
    adjustHeight();
  }
  return (
    <div>
      <h3>Reasizable Text Area</h3>
      <div className={styles.textarea_container}>
        <textarea
          ref={textbox}
          onChange={handleKeyDown}
          className={styles.textarea}
        />
      </div>
    </div>
  );
}
