'use client';

import { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import styles from './CodeContainer.module.css';

function CodeContiner({ cssCode, setIsCode }) {
  const [isCopiedCSS, setIsCopiedCSS] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopiedCSS(true);
      setTimeout(() => setIsCopiedCSS(false), 2000);
    });
  };

  useEffect(() => {
    Prism.highlightAll(); // Kiemelés alkalmazása minden <pre> blokkra
  }, [cssCode]);

  return (
    <div className={styles.codeContainer}>
      <button className={styles.closeBtn} onClick={setIsCode}>
        X
      </button>

      <h3 className={styles.title}>CSS</h3>
      <pre className='language-css'>
        <div>
          {!isCopiedCSS ? (
            <button
              className={styles.icon}
              onClick={() => copyToClipboard(cssCode)}
            >
              <img src='/clipboard.svg' alt='Copy to Clipboard' />
              Copy to Clipboard
            </button>
          ) : (
            <button className={styles.icon}>
              <img src='/check.svg' alt='Copied successfully' />
              Copied
            </button>
          )}
        </div>

        <code>{cssCode}</code>
      </pre>
    </div>
  );
}

export default CodeContiner;
