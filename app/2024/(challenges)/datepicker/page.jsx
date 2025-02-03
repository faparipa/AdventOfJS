'use client';
// import Datetime from 'react-datetime';
// import { useRef, useState } from 'react';
// import 'react-datetime/css/react-datetime.css';
import styles from './datepicker.module.css';

// function DatePicker() {
//   const [selectedDate, setSelectedDate] = useState();
//   const datetime = useRef(new Date());
//   function handleChange(date) {
//     setSelectedDate(date);
//   }

//   console.log(selectedDate);

//   return (
//     <div>
//       <h2>Date Picker</h2>
//       <div className={styles.container}>
//         <Datetime
//           // locale='HU-hu'
//           dateFormat='YYYY-MM-DD'
//           timeFormat={false}
//           className={styles.datepicker}
//           // ref={datetime}
//           inpute={true}
//           selected={selectedDate}
//           onChange={handleChange}
//         />
//         <img className={styles.calendar} src='/calendar.svg' alt='calendar' />
//       </div>
//     </div>
//   );
// }

// export default DatePicker;
// components/DatePicker.js
import { useState, useEffect } from 'react';
import {
  format,
  addMonths,
  subMonths,
  isToday,
  isBefore,
  isAfter,
} from 'date-fns';
//import styles from "./datepicker.module.css";

const DatePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

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
          const isSelected =
            selectedDate &&
            selectedDate.getDate() === date.getDate() &&
            selectedDate.getMonth() === date.getMonth();
          days.push(
            <div
              key={dayCounter}
              className={`${styles.day} ${isPassed ? styles.passed : ''} ${
                isToday(date) ? styles.today : ''
              } ${isSelected ? styles.selected : ''}`}
              onClick={() => handleDateClick(date)}
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

  useEffect(() => {
    // Set default date to today's date on initial load
    if (!selectedDate) {
      setSelectedDate(new Date());
    }
  }, [selectedDate]);

  return (
    <div className={styles.container}>
      <input
        type='text'
        className={styles.input}
        value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
        onFocus={handleInputFocus}
        readOnly
      />
      <img src='/calendar.svg' alt='calendar' className={styles.icon} />

      {isOpen && (
        <div className={styles.datePicker}>
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
      )}
    </div>
  );
};

export default DatePicker;
