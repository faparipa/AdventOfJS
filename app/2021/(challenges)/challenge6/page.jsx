'use client';
import { useState } from 'react';
import styles from './RangeSlider.module.css';

export default function RangeSliderPage() {
  const [value, setValue] = useState(5000);
  const dollars = (value / 100).toFixed(2);

  function handleRangeChange(event) {
    setValue(event.target.value);
  }

  function handleBuy() {
    console.log('You buy it: $', dollars);
  }

  return (
    <div className={styles.container}>
      <h2>Range slider</h2>
      <div className={styles.wrapper}>
        <div className={styles.amount}>
          <sup>$</sup>
          <span className={styles.dollars}>{dollars}</span>
        </div>
        <input
          className={styles.rangeInput}
          type='range'
          id='priceRange'
          min='0'
          max='10000'
          step='1'
          value={value}
          onChange={handleRangeChange}
        />
        <br />
        <button className={styles.btn} onClick={handleBuy}>
          Buy Now
        </button>
      </div>
    </div>
  );
}
