'use client';
import styles from './CalendarPicker.module.css';
import { useState, useEffect } from 'react';
import {
  format,
  addMonths,
  subMonths,
  isToday,
  isBefore,
  isAfter,
} from 'date-fns';

const DatePicker = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const renderDays = () => {
    const days = [];
    const startOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const firstDayOfWeek = startOfMonth.getDay();
    const lastDateOfMonth = endOfMonth.getDate();

    let dayCounter = 1;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfWeek) {
          days.push(<div className={styles.day} key={`empty-${i}-${j}`} />);
        } else if (dayCounter <= lastDateOfMonth) {
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            dayCounter
          );
          const isPassed = isBefore(date, new Date());

          days.push(
            <div
              key={dayCounter}
              className={`${styles.day} ${isPassed ? styles.passed : ''} ${
                isToday(date) ? styles.today : ''
              } `}
            >
              {dayCounter}
            </div>
          );
          dayCounter++;
        }
      }
    }
    return days;
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <button className={styles.arrowbtn} onClick={handlePrevMonth}>
            <img src='/arrow--left.svg' alt='leftarrow' />
          </button>
          <span>{format(currentMonth, 'MMMM yyyy')}</span>
          <button className={styles.arrowbtn} onClick={handleNextMonth}>
            <img src='/arrow--right.svg' alt='leftarrow' />
          </button>
        </div>
        <div className={styles.calendar}>
          <div className={styles.weekdays}>
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className={styles.days}>{renderDays()}</div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
