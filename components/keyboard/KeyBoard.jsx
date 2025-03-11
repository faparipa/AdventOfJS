'use client';
import { useState, useEffect } from 'react';
import styles from './keyboard.module.css';

// A billentyűzet sorokra bontva
const keyRows = [
  [
    '`',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '-',
    '=',
    'BACKSPACE',
  ],
  ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['CAPSLOCK', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER'],
  ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT'],
];

export default function Keyboard() {
  const [jigglingKey, setJigglingKey] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toUpperCase() === jigglingKey) {
        setJigglingKey(null);
        setTimeout(() => {
          // Véletlenszerűen kiválasztunk egy új billentyűt a teljes billentyűzetből
          const allKeys = keyRows.flat(); // Összes billentyű egy tömbben
          const randomKey = allKeys[Math.floor(Math.random() * allKeys.length)];
          setJigglingKey(randomKey);
        }, 1); // 1 másodperc késleltetés
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [jigglingKey]);

  useEffect(() => {
    // Véletlenszerűen kiválasztunk egy kezdő billentyűt
    const allKeys = keyRows.flat(); // Összes billentyű egy tömbben
    const randomKey = allKeys[Math.floor(Math.random() * allKeys.length)];
    setJigglingKey(randomKey);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.keyboard}>
        <h2>Eyes on the Screen</h2>
        {keyRows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((key, keyIndex) => (
              <button
                key={keyIndex}
                className={`${styles.key} ${
                  key === jigglingKey ? styles.jiggle : ''
                }`}
                data-key={key}
              >
                {key === 'BACKSPACE'
                  ? 'DEL'
                  : key === 'CAPSLOCK'
                  ? 'CAPS'
                  : key === 'SHIFT'
                  ? 'SHIFT'
                  : key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// {key === 'BACKSPACE'
//     ? 'DEL'
//     : key === 'CAPSLOCK'
//     ? 'CAPS'
//     : key === 'SHIFT'
//     ? 'SHIFT'
//     : key}
// ez ugyanaz mintha ezt írtam volna:
// let displayText;
// if (key === 'BACKSPACE') {
//   displayText = 'DEL';
// } else if (key === 'CAPSLOCK') {
//   displayText = 'CAPS';
// } else if (key === 'SHIFT') {
//   displayText = 'SHIFT';
// } else {
//   displayText = key;
// }
