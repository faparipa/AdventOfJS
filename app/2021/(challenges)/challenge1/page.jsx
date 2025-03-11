// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import styles from './challenge1.module.css';

// export default function CountdownPage() {
//   const [minute, setMinute] = useState(15);
//   const [second, setSecond] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isFinished, setIsFinished] = useState(false);
//   const [isEditable, setIsEditable] = useState(false);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     if (isRunning) {
//       intervalRef.current = setInterval(() => {
//         if (second > 0) {
//           setSecond((prevSecond) => prevSecond - 1);
//         } else if (minute > 0) {
//           setMinute((prevMinute) => prevMinute - 1);
//           setSecond(59);
//         } else {
//           setIsFinished(true);
//           clearInterval(intervalRef.current);
//           setIsRunning(false);
//           setTimeout(() => {
//             alert('Time is up!');
//             resetTimer();
//           }, 100);
//         }
//       }, 1000);
//     } else {
//       clearInterval(intervalRef.current);
//     }

//     return () => clearInterval(intervalRef.current);
//   }, [isRunning, minute, second]);

//   const toggleStartStop = () => {
//     setIsRunning((prevState) => !prevState);
//     setIsEditable(false);
//   };

//   const resetTimer = () => {
//     setMinute(15);
//     setSecond(0);
//     setIsFinished(false);
//     setIsRunning(false);
//   };

//   const openSettings = () => {
//     setIsEditable(true);
//     setIsRunning(false);
//   };

//   const handleTimeChange = (type, value) => {
//     const newValue = Number(value);
//     if (type === 'minute' && newValue >= 0 && newValue < 100) {
//       setMinute(newValue);
//     } else if (type === 'second' && newValue >= 0 && newValue < 60) {
//       setSecond(newValue);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h3>Countdown</h3>
//       <div className={styles.wrapper}>
//         <div className={`${styles.ring} ${isFinished ? styles.finished : ''}`}>
//           <svg width='518' height='518' viewBox='0 0 518 518'>
//             <circle
//               strokeWidth='9px'
//               cx='259'
//               cy='259'
//               r='254'
//               className={isFinished ? styles.redRing : styles.greenRing}
//             />
//           </svg>
//         </div>

//         <div className={styles.timer}>
//           <div className={styles.time}>
//             <div className={styles.minutes}>
//               <input
//                 className={styles.textinput}
//                 type='text'
//                 value={String(minute).padStart(2, '0')}
//                 disabled={!isEditable}
//                 onChange={(e) => handleTimeChange('minute', e.target.value)}
//               />
//             </div>
//             <div className={styles.colon}>:</div>
//             <div className={styles.seconds}>
//               <input
//                 className={styles.textinput}
//                 type='text'
//                 value={String(second).padStart(2, '0')}
//                 disabled={!isEditable}
//                 onChange={(e) => handleTimeChange('second', e.target.value)}
//               />
//             </div>
//           </div>
//           <button className={styles.start} onClick={toggleStartStop}>
//             {isRunning ? 'Pause' : 'Start'}
//           </button>
//           <button
//             className={styles.settings}
//             onClick={openSettings}
//             aria-label='Open settings'
//           >
//             <img src='/gear.svg' alt='Settings' />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './challenge1.module.css';

export default function CountdownPage() {
  const [timer, setTimer] = useState({
    minute: 15,
    second: 0,
    isRunning: false,
    isFinished: false,
    isEditable: false,
  });

  const intervalRef = useRef(null);

  const updateTimer = useCallback((updates) => {
    setTimer((prevState) => ({ ...prevState, ...updates }));
  }, []);

  useEffect(() => {
    if (timer.isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer.second > 0) {
            return { ...prevTimer, second: prevTimer.second - 1 };
          } else if (prevTimer.minute > 0) {
            return { ...prevTimer, minute: prevTimer.minute - 1, second: 59 };
          } else {
            clearInterval(intervalRef.current);

            return { ...prevTimer, isRunning: false, isFinished: true };
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [timer.isRunning, timer.minute, timer.second]);

  useEffect(() => {
    if (timer.isFinished) {
      setTimeout(() => {
        alert('Time is up!');
        resetTimer();
      }, 100);
    }
  }, [timer.isFinished]);

  const toggleStartStop = () => {
    updateTimer({ isRunning: !timer.isRunning, isEditable: false });
  };

  const resetTimer = () => {
    updateTimer({ minute: 15, second: 0, isRunning: false, isFinished: false });
  };

  const openSettings = () => {
    updateTimer({ isEditable: true, isRunning: false });
  };

  const handleTimeChange = (type, value) => {
    const newValue = Number(value);
    if (type === 'minute' && newValue >= 0 && newValue < 100) {
      updateTimer({ minute: newValue });
    } else if (type === 'second' && newValue >= 0 && newValue < 60) {
      updateTimer({ second: newValue });
    }
  };

  return (
    <div className={styles.container}>
      <h3>Countdown</h3>
      <div className={styles.wrapper}>
        <div
          className={`${styles.ring} ${
            timer.isFinished ? styles.finished : ''
          }`}
        >
          <svg width='518' height='518' viewBox='0 0 518 518'>
            <circle
              strokeWidth='9px'
              cx='259'
              cy='259'
              r='254'
              className={timer.isFinished ? styles.redRing : styles.greenRing}
            />
          </svg>
        </div>

        <div className={styles.timer}>
          <div className={styles.time}>
            <div className={styles.minutes}>
              <input
                className={styles.textinput}
                type='text'
                value={String(timer.minute).padStart(2, '0')}
                disabled={!timer.isEditable}
                onChange={(e) => handleTimeChange('minute', e.target.value)}
              />
            </div>
            <div className={styles.colon}>:</div>
            <div className={styles.seconds}>
              <input
                className={styles.textinput}
                type='text'
                value={String(timer.second).padStart(2, '0')}
                disabled={!timer.isEditable}
                onChange={(e) => handleTimeChange('second', e.target.value)}
              />
            </div>
          </div>
          <button className={styles.start} onClick={toggleStartStop}>
            {timer.isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            className={styles.settings}
            onClick={openSettings}
            aria-label='Open settings'
          >
            <img src='/gear.svg' alt='Settings' />
          </button>
        </div>
      </div>
    </div>
  );
}
