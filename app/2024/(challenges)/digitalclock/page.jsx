'use client';

import { useState, useEffect } from 'react';
import styles from './digitalclock.module.css';
import Clock from '@/components/clock/clock';

export default function DigitalClockPage() {
  const [time, setTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  });
  const [isClient, setIsClient] = useState(false);

  // Function to get the current time in HH:MM:SS AM/PM format without leading zeros
  function getCurrentTime() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour time to 12-hour time
    if (hours > 12) {
      hours = hours - 12;
    } else if (hours === 0) {
      hours = 12; // Midnight is 12 AM
    }

    // Format time without leading zeros
    hours = hours.toString();
    minutes = minutes < 10 ? minutes.toString() : minutes; // Remove leading 0 in minutes
    // seconds = seconds < 10 ? seconds.toString() : seconds; // Remove leading 0 in seconds

    return {
      hours,
      minutes,
      seconds,
      ampm,
    };
  }

  // Effect to run when component mounts (client-side)
  useEffect(() => {
    setIsClient(true);

    // Function to update the time every second
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  // Only render the clock once on the client-side
  if (!isClient) {
    return null; // Prevent rendering until after hydration
  }

  return (
    <div className={styles.container}>
      <Clock {...time} />
      <div className={styles.wrapper}>
        <div className={styles.toolbar}>
          <img src='/toolbar.svg' alt='toolbar' />
          <div className={styles.digitClock}>
            {time.hours}:{time.minutes} {time.ampm}
          </div>
        </div>
      </div>
    </div>
  );
}
