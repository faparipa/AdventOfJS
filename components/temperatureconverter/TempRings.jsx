import styles from './tempRings.module.css';
import DialComponent from './Dial';

export default function TempeRings({
  celsius,
  setCelsius,
  farenheit,
  setFarenheit,
  deg,
  convertToCelsius,
  convertToFarenheit,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.circles}>
        <img src='/dots.svg' alt='dots' className={styles.circle_dot} />
        <div className={styles.dialComponent}>
          <DialComponent
            deg={deg}
            celsius={celsius}
            setCelsius={setCelsius}
            convertToFarenheit={convertToFarenheit}
            farenheit={farenheit}
            setFarenheit={setFarenheit}
          />
        </div>
        <img
          src='/inner-ring.svg'
          alt='inner ring'
          className={styles.circle_in}
        />
        <form className={styles.inputContainer}>
          {deg === 'C' ? (
            <div className={styles.deg}>
              <input
                type='number'
                name='celsius'
                value={celsius}
                onChange={(event) => setCelsius(Number(event.target.value))}
              />
              <span>°{deg}</span>
            </div>
          ) : (
            <div className={styles.deg}>
              <input
                type='number'
                name='farenheit'
                value={farenheit}
                onChange={(event) => setFarenheit(Number(event.target.value))}
              />
              <span>°{deg}</span>
            </div>
          )}
          <div className={styles.number0}>0°</div>
          <div className={styles.number10}>{deg === 'C' ? '10°' : '25°'} </div>
          <div className={styles.number20}>{deg === 'C' ? '20°' : '50°'}</div>
          <div className={styles.number30}>{deg === 'C' ? '30°' : '75°'}</div>
        </form>
      </div>
      {deg === 'C' ? (
        <button className={styles.btn} onClick={convertToFarenheit}>
          Convert to Fahrenheit
        </button>
      ) : (
        <button className={styles.btn} onClick={convertToCelsius}>
          Convert to Celsius
        </button>
      )}
    </div>
  );
}
