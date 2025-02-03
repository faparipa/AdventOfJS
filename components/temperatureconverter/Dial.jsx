// 'use client';
// import { useState, useEffect } from 'react';
// import styles from './dial.module.css';

// const DialComponent = ({
//   celsius,
//   setCelsius,
//   farenheit,
//   setFarenheit,
//   deg,
// }) => {
//   const [isMousePressed, setIsMousePressed] = useState(false);
//   const [lastAngle, setLastAngle] = useState(null);

//   // Convert Celsius to Fahrenheit
//   const convertCelsiusToFahrenheit = (celsius) => {
//     return Math.round((9 / 5) * celsius + 32);
//   };

//   // Convert Fahrenheit to Celsius
//   const convertFahrenheitToCelsius = (farenheit) => {
//     return Math.round((farenheit - 32) * (5 / 9));
//   };

//   // Calculate the angle for the Celsius scale (0°C to 40°C mapped to 180° to 540°)
//   const calculateAngleForCelsius = (celsius) => {
//     return 180 + (celsius / 40) * 360; // Map 0°C to 180° and 40°C to 540°
//   };

//   // Calculate the angle for the Fahrenheit scale (0°F to 100°F mapped to 180° to 540°)
//   const calculateAngleForFahrenheit = (farenheit) => {
//     return 180 + (farenheit / 100) * 360; // Map 0°F to 180° and 100°F to 540°
//   };

//   // Handle mouse down event
//   const handleMouseDown = (e) => {
//     setIsMousePressed(true);

//     const boundingRect = e.target.getBoundingClientRect();
//     const centerX = boundingRect.left + boundingRect.width / 2;
//     const centerY = boundingRect.top + boundingRect.height / 2;
//     const mouseX = e.clientX;
//     const mouseY = e.clientY;

//     // Calculate the angle between the mouse and the center of the dial
//     const angle =
//       Math.atan2(mouseY - centerY, mouseX - centerX) * (360 / Math.PI) + 360;

//     // Set the initial angle based on the current temperature
//     if (deg === 'C') {
//       setLastAngle(angle); // Store the initial angle when pressing
//     } else {
//       setLastAngle(angle); // Store the initial angle when pressing
//     }
//   };

//   // Handle mouse move event
//   const handleMouseMove = (e) => {
//     if (!isMousePressed) return;

//     const boundingRect = e.target.getBoundingClientRect();
//     const centerX = boundingRect.left + boundingRect.width / 2;
//     const centerY = boundingRect.top + boundingRect.height / 2;
//     const mouseX = e.clientX;
//     const mouseY = e.clientY;

//     // Calculate the angle between the mouse and the center of the dial
//     const angle =
//       Math.atan2(mouseY - centerY, mouseX - centerX) * (360 / Math.PI) + 360;

//     // Calculate the angle difference since the last angle
//     let angleDiff = angle - lastAngle;

//     // If the difference is negative, adjust to make sure it's within the 360° range
//     if (angleDiff < -180) {
//       angleDiff += 360;
//     } else if (angleDiff > 180) {
//       angleDiff -= 360;
//     }

//     // If we're working with Celsius
//     if (deg === 'C') {
//       const newTemp = celsius + (angleDiff / 360) * 40;
//       const clampedTemp = Math.min(Math.max(newTemp, 0), 40);
//       setCelsius(Math.round(clampedTemp));

//       // Convert Celsius to Fahrenheit and update
//       const newFahrenheit = Math.round(convertCelsiusToFahrenheit(clampedTemp));
//       setFarenheit(newFahrenheit);
//     } else {
//       // If we're working with Fahrenheit
//       const newTemp = farenheit + (angleDiff / 360) * 100;
//       const clampedTemp = Math.min(Math.max(newTemp, 0), 100);
//       setFarenheit(Math.round(clampedTemp));

//       // Convert Fahrenheit to Celsius and update
//       const newCelsius = Math.round(convertFahrenheitToCelsius(clampedTemp));
//       setCelsius(newCelsius);
//     }

//     // Update the last angle to the current angle
//     setLastAngle(angle);
//   };

//   // Handle mouse up event
//   const handleMouseUp = () => {
//     setIsMousePressed(false); // Stop rotating when the mouse button is released
//   };

//   useEffect(() => {
//     if (isMousePressed) {
//       // Attach mouse move and mouse up listeners when mouse is pressed
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//     } else {
//       // Clean up event listeners when mouse is not pressed
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     }

//     // Cleanup on component unmount
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isMousePressed]);

//   // Calculate the angle based on the current temperature (Celsius or Fahrenheit)
//   const angle =
//     deg === 'C'
//       ? calculateAngleForCelsius(celsius)
//       : calculateAngleForFahrenheit(farenheit);

//   return (
//     <div
//       className={`${styles.dialContainer} ${
//         isMousePressed ? styles.dialPressed : ''
//       }`}
//       onMouseDown={handleMouseDown} // Start rotating on mouse down
//       style={{ cursor: 'grab' }}
//     >
//       <div
//         className={styles.circleContainer}
//         style={{
//           transformOrigin: 'center center',
//           transform: `rotate(${angle}deg)`, // Rotate the dial based on the temperature
//         }}
//       >
//         {/* Outer ring (circle) */}
//         <img
//           src='/outer-ring.svg'
//           alt='outer ring'
//           className={styles.circle_out}
//         />

//         {/* Dial image (SVG) */}
//         <img src='/dial.svg' alt='dial' className={styles.dialC} />
//       </div>
//     </div>
//   );
// };

// export default DialComponent;
'use client';
import { useState, useEffect } from 'react';
import styles from './dial.module.css';

const DialComponent = ({
  celsius,
  setCelsius,
  farenheit,
  setFarenheit,
  deg,
}) => {
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [lastAngle, setLastAngle] = useState(null);

  const convertCelsiusToFahrenheit = (celsius) =>
    Math.round((9 / 5) * celsius + 32);
  const convertFahrenheitToCelsius = (farenheit) =>
    Math.round((farenheit - 32) * (5 / 9));

  const calculateAngle = (temp, scale) => {
    const max = scale === 'C' ? 40 : 100;
    return 180 + (temp / max) * 360;
  };

  const handleMouseInteraction = (e, isMouseDown = false) => {
    if (!isMouseDown && !isMousePressed) return;

    const boundingRect = e.target.getBoundingClientRect();
    const centerX = boundingRect.left + boundingRect.width / 2;
    const centerY = boundingRect.top + boundingRect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const angle =
      Math.atan2(mouseY - centerY, mouseX - centerX) * (360 / Math.PI) + 360;

    if (isMouseDown) {
      setIsMousePressed(true);
      setLastAngle(angle);
    } else {
      let angleDiff = angle - lastAngle;
      if (angleDiff < -180) angleDiff += 360;
      else if (angleDiff > 180) angleDiff -= 360;

      const newTemp =
        deg === 'C'
          ? celsius + (angleDiff / 360) * 40
          : farenheit + (angleDiff / 360) * 100;
      const clampedTemp = Math.min(
        Math.max(newTemp, 0),
        deg === 'C' ? 40 : 100
      );

      if (deg === 'C') {
        setCelsius(Math.round(clampedTemp));
        setFarenheit(Math.round(convertCelsiusToFahrenheit(clampedTemp)));
      } else {
        setFarenheit(Math.round(clampedTemp));
        setCelsius(Math.round(convertFahrenheitToCelsius(clampedTemp)));
      }
      setLastAngle(angle);
    }
  };

  useEffect(() => {
    if (isMousePressed) {
      document.addEventListener('mousemove', handleMouseInteraction);
      document.addEventListener('mouseup', () => setIsMousePressed(false));
    } else {
      document.removeEventListener('mousemove', handleMouseInteraction);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseInteraction);
      document.removeEventListener('mouseup', () => setIsMousePressed(false));
    };
  }, [isMousePressed]);

  const angle = calculateAngle(deg === 'C' ? celsius : farenheit, deg);

  return (
    <div
      className={`${styles.dialContainer} ${
        isMousePressed ? styles.dialPressed : ''
      }`}
      onMouseDown={(e) => handleMouseInteraction(e, true)}
      style={{ cursor: 'grab' }}
    >
      <div
        className={styles.circleContainer}
        style={{
          transformOrigin: 'center center',
          transform: `rotate(${angle}deg)`,
        }}
      >
        <img
          src='/outer-ring.svg'
          alt='outer ring'
          className={styles.circle_out}
        />
        <img src='/dial.svg' alt='dial' className={styles.dialC} />
      </div>
    </div>
  );
};

export default DialComponent;
