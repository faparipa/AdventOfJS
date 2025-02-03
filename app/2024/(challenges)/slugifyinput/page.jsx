'use client';
import { useRef, useState } from 'react';
import styles from './slugifyinput.module.css';

export default function SlugifyPage() {
  const [sluged, setSluged] = useState();
  const inputRef = useRef(null);

  function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;
  }
  function handleSlug() {
    const inputText = inputRef.current.value;
    if (inputText) {
      const slugifyText = slugify(inputText);
      setSluged(slugifyText);
    }
  }

  function handleClear() {
    inputRef.current.value = '';
    setSluged();
  }

  return (
    <div className={styles.container}>
      <h2>Slugify Input: </h2>

      <div className={styles.wrapper}>
        <label htmlFor='slugifyInput' className={styles.title}>
          Title:
        </label>
        <input
          id='lugifyInput'
          type='text'
          placeholder='write some text'
          className={styles.inputField}
          ref={inputRef}
        />
        {!sluged ? (
          <button className={styles.icon} onClick={handleSlug}>
            <img src='/clipboard.svg' alt='Clipboard' />
          </button>
        ) : (
          <button className={styles.icon} onClick={handleClear}>
            <img src='/check.svg' alt='Clipboard' />
          </button>
        )}
      </div>
      {sluged && <p className={styles.slug}>Result: /{sluged}</p>}
    </div>
  );
}
