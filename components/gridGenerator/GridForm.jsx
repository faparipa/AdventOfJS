import styles from './GridForm.module.css';
import React from 'react';

const GridForm = ({
  columns,
  setColumns,
  rows,
  setRows,
  columnGap,
  setColumnGap,
  rowGap,
  setRowGap,
  handleChange,
  getCode,
  isCode,
}) => {
  return (
    <form className={styles.formContainer}>
      <h2 className={styles.title}>CSS Grid Generator</h2>

      {/* Columns */}
      <div className={styles.inputContainer}>
        <label htmlFor='columns'>Columns</label>
        <div className={styles.input}>
          <input
            id='columns'
            type='number'
            value={columns}
            onChange={handleChange(setColumns)}
            min='1'
            max='10'
          />
        </div>
      </div>

      {/* Rows */}
      <div className={styles.inputContainer}>
        <label htmlFor='rows'>Rows</label>
        <div className={styles.input}>
          <input
            id='rows'
            type='number'
            value={rows}
            onChange={handleChange(setRows)}
            min='1'
            max='10'
          />
        </div>
      </div>

      {/* Column Gap */}
      <div className={styles.inputContainer}>
        <label htmlFor='columnGap'>
          Column Gap <span>(in px)</span>
        </label>
        <div className={styles.input}>
          <input
            id='columnGap'
            type='number'
            value={columnGap}
            onChange={handleChange(setColumnGap)}
            min='0'
          />
        </div>
      </div>

      {/* Row Gap */}
      <div className={styles.inputContainer}>
        <label htmlFor='rowGap'>
          Row Gap <span>(in px)</span>
        </label>
        <div className={styles.input}>
          <input
            id='rowGap'
            type='number'
            value={rowGap}
            onChange={handleChange(setRowGap)}
            min='0'
          />
        </div>
      </div>
      <button
        className={!isCode ? styles.btn : styles.noActive}
        onClick={getCode}
      >
        Get Code
      </button>
    </form>
  );
};

export default GridForm;
