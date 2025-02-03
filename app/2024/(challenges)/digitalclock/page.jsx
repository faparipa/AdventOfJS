'use client';
import { useEffect, useState } from 'react';
import styles from './digitalclock.module.css';
import Clock from '@/components/clock/clock';

export default function DigitalClockPage() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const AmPm = hours < 13 ? 'AM' : 'PM';
  return (
    <div>
      <h2>Digital Clock </h2>
      <div className={styles.container}>
        <Clock hours={hours} minutes={minutes} seconds={seconds} />
        <div className={styles.wrapper}>
          <div className={styles.digitClock}>
            <span>
              {hours}:{minutes} {AmPm}
            </span>
          </div>
          <div className={styles.toolbar}>
            <img src='/toolbar.svg' alt='toolbar' />
          </div>
        </div>
      </div>
    </div>
  );
}
