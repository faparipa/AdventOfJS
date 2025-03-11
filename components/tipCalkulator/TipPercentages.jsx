import styles from './TipPercentages.module.css';

function TipPercentages({ selectedTip, onTipChange }) {
  const percentages = ['0.05', '0.1', '0.15', '0.2'];

  return (
    <div className={styles['tip-percentages']}>
      {/* <div>
            <input
              className={styles.radioInput}
              type='radio'
              name='tip'
              value='0.05'
              id='five-percent'
              checked={state.tipPercentage === 0.05}
              onChange={handleTipChange}
            />
            <label className={styles.label} htmlFor='five-percent'>
              5%
            </label>
          </div>
          <div>
            <input
              className={styles.radioInput}
              type='radio'
              name='tip'
              value='0.10'
              id='ten-percent'
              checked={state.tipPercentage === 0.1}
              onChange={handleTipChange}
            />
            <label className={styles.label} htmlFor='ten-percent'>
              10%
            </label>
          </div>
          <div>
            <input
              className={styles.radioInput}
              type='radio'
              name='tip'
              value='0.15'
              id='fifteen-percent'
              checked={state.tipPercentage === 0.15}
              onChange={handleTipChange}
            />
            <label className={styles.label} htmlFor='fifteen-percent'>
              15%
            </label>
          </div>
          <div>
            <input
              className={styles.radioInput}
              type='radio'
              name='tip'
              value='0.20'
              id='twenty-percent'
              checked={state.tipPercentage === 0.2}
              onChange={handleTipChange}
            />
            <label className={styles.label} htmlFor='twenty-percent'>
              20%
            </label>
          </div> */}
      {percentages.map((value) => (
        <div key={value}>
          <input
            className={styles.radioInput}
            type='radio'
            name='tip'
            value={value}
            id={`${value}-percent`}
            checked={selectedTip.toString() === value}
            onChange={onTipChange}
          />
          <label className={styles.label} htmlFor={`${value}-percent`}>
            {(parseFloat(value) * 100).toFixed(0)}%
          </label>
        </div>
      ))}
    </div>
  );
}

export default TipPercentages;
