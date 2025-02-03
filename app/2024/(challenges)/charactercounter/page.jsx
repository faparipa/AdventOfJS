'use client';
import { useState } from 'react';
import styles from './charactercounter.module.css';

export default function CharacterCounterPage() {
  const [charCount, setCharCount] = useState(0);

  function handleInputChange(e) {
    setCharCount(e.target.value.length);
  }

  return (
    <div>
      <h3>CharacterCounter</h3>
      <div className={styles.textarea_container}>
        <textarea className={styles.textarea} onChange={handleInputChange} />
        <h4>Count: {charCount}</h4>
      </div>
    </div>
  );
}
