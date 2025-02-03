'use client';
import { useRef, useState } from 'react';
import styles from './copyclipboard.module.css';

export default function CopyClipboardPage() {
  const [copyText, setCopyText] = useState();
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef(null); // useRef hook a DOM elemhez való hozzáféréshez

  const handleClick = () => {
    const textToCopy = inputRef.current.value; // Az input mező értéke a ref-en keresztül

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy); // Másolás a vágólapra
      setCopyText(textToCopy); // Frissítjük a copyText állapotot
      setIsCopied(true);
      setTimeout(() => {
        inputRef.current.value = '';
        setIsCopied(false);
      }, 3000);
    } else {
      alert('Kérlek, írj be valamit a szövegdobozba!');
    }
  };

  return (
    <div>
      <h2>Copy to Clipboard</h2>
      <div className={styles.customTextareaWrapper}>
        <input
          ref={inputRef} // A ref a DOM elemhez való hozzáférést biztosít
          className={styles.customTextarea}
          type='text'
          placeholder='Írd be a másolandó szöveget'
        />
        {!isCopied ? (
          <button className={styles.icon} onClick={handleClick}>
            <img src='/clipboard.svg' alt='Clipboard Icon' />
          </button>
        ) : (
          <button className={styles.icon}>
            <img src='/check.svg' alt='Check Icon' />
          </button>
        )}
      </div>
      {isCopied && (
        <div>
          <p>Szöveg kimásolva vágólapra </p>
          <p> {copyText}</p>
        </div>
      )}
    </div>
  );
}
