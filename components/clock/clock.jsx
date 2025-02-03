'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './clock.module.css';

const Clock = ({ hours, minutes, seconds }) => {
  const secondHandRef = useRef(null);
  const minHandRef = useRef(null);
  const hourHandRef = useRef(null);

  const [prevSeconds, setPrevSeconds] = useState(seconds);

  useEffect(() => {
    const secondHand = secondHandRef.current;
    const minHand = minHandRef.current;
    const hourHand = hourHandRef.current;

    function setDate() {
      const secondsDegrees = (seconds / 60) * 360 + 90;
      if (seconds !== prevSeconds) {
        secondHand.style.transition = 'transform 0.05s ease';
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
        setPrevSeconds(seconds);
      } else {
        secondHand.style.transition = 'none'; // Disable transition when no change in seconds
      }

      const minsDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
      minHand.style.transform = `rotate(${minsDegrees}deg)`;

      const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30 + 90;
      hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }

    setDate(); // Initial render to set the time correctly

    // Re-run every second
    const intervalId = setInterval(setDate, 1000);

    return () => clearInterval(intervalId);
  }, [seconds, minutes, hours, prevSeconds]);

  return (
    <div className={styles.clock}>
      <div className={styles['clock-face']}>
        <div
          ref={hourHandRef}
          className={`${styles.hand} ${styles['hour-hand']}`}
        ></div>
        <div
          ref={minHandRef}
          className={`${styles.hand} ${styles['min-hand']}`}
        ></div>
        <div
          ref={secondHandRef}
          className={`${styles.hand} ${styles['second-hand']}`}
        ></div>
      </div>
    </div>
  );
};

export default Clock;
