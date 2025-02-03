'use client';
import { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import styles from './CodePanel.module.css';

function CodePanel({
  setIsCode,
  setColumns,
  setRows,
  setColumnGap,
  setRowGap,
  columnFr,
  rowFr,
  columnGap,
  rowGap,
}) {
  const [isCopiedCSS, setIsCopiedCSS] = useState(false);

  // Segédfunkció a repeat szintaxis generálásához
  const convertToRepeatSyntax = (frArray) => {
    let result = [];
    let count = 1;

    for (let i = 1; i <= frArray.length; i++) {
      // Ha az aktuális és az előző érték is '1fr', akkor számoljuk össze őket
      if (frArray[i] === '1fr' && frArray[i - 1] === '1fr') {
        count++;
      } else {
        // Ha több '1fr' van egymás után, cseréljük le 'repeat' szintaxisra
        if (count > 1) {
          result.push(`repeat(${count}, 1fr)`);
        } else if (i > 0 && frArray[i - 1] !== '1fr') {
          // A nem '1fr' értékeket változtatás nélkül hozzáadjuk
          result.push(frArray[i - 1]);
        } else if (i > 0 && frArray[i - 1] === '1fr') {
          // Ha csak egy darab '1fr' van, akkor közvetlenül hozzáadjuk
          result.push('1fr');
        }
        // Reseteljük a számlálót
        count = 1;
      }
    }

    return result.join(' ');
  };

  // CSS kód generálása
  const generateCSS = () => {
    const convertedColumns = convertToRepeatSyntax(columnFr);
    const convertedRows = convertToRepeatSyntax(rowFr);

    return `
/* Grid container styles */
.parent {
  display: grid;
  grid-template-columns: ${convertedColumns};
  grid-template-rows: ${convertedRows};
  grid-column-gap: ${columnGap}px;
  grid-row-gap: ${rowGap}px;
}
    `;
  };

  // HTML kód generálása
  const generateHTML = () => {
    return `<div class="parent">
  <!-- Add your grid items here -->
</div>`;
  };

  // Kód másolása a vágólapra
  const copyToClipboard = (text, setIsCopied) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  // A Prism.js újrarenderelése, hogy kiemelje a kódot
  useEffect(() => {
    Prism.highlightAll(); // Kiemelés alkalmazása minden <pre> blokkra
  }, []);

  function handleClose() {
    setIsCode(false);
    setColumns(3);
    setRows(3);
    setColumnGap(0);
    setRowGap(0);
  }

  return (
    <div className={styles.codeContainer}>
      <button className={styles.closeBtn} onClick={handleClose}>
        X
      </button>

      <h3 className={styles.title}>CSS</h3>
      <pre className='language-css'>
        <div>
          {!isCopiedCSS ? (
            <button
              className={styles.icon}
              onClick={() => copyToClipboard(generateCSS(), setIsCopiedCSS)}
            >
              <img src='/clipboard.svg' alt='Clipboard Icon' />
              Copy to Clipboard
            </button>
          ) : (
            <button className={styles.icon}>
              <img src='/check.svg' alt='Check Icon' />
              Copied
            </button>
          )}
        </div>

        <code>{generateCSS()}</code>
      </pre>

      <h3 className={styles.title}>HTML</h3>
      <pre className='language-markup'>
        <div>
          <button
            className={styles.icon}
            onClick={() => copyToClipboard(generateHTML(), setIsCopiedCSS)}
          >
            <img src='/clipboard.svg' alt='Clipboard Icon' />
            Copy to Clipboard
          </button>
        </div>

        <code>{generateHTML()}</code>
      </pre>
    </div>
  );
}

export default CodePanel;
