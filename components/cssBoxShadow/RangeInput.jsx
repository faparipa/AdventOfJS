// 'use client';
// import { useState } from 'react';
// import styles from './RangeInput.module.css';

// function RangeInput({ label, name, initValue, handleInputChange }) {
//   const [value, setValue] = useState(initValue);

//   const handleInputChange = (event) => {
//     setValue(event.target.value);
//   };

//   return (
//     <div className={styles.rangeContainer}>
//       <label htmlFor={name}>
//         {label}
//         <span className={styles.rangeBox}>
//           <input
//             type='number'
//             name={name}
//             id={name}
//             min={0}
//             max={100}
//             value={value}
//             onChange={handleInputChange}
//           />
//           <p>px</p>
//         </span>
//       </label>
//       <input
//         type='range'
//         name={name}
//         id={name}
//         min={0}
//         max={100}
//         value={value} // Bind range input to state
//         onChange={handleInputChange}
//       />
//     </div>
//   );
// }

// export default RangeInput;
import styles from './RangeInput.module.css';

function RangeInput({ label, name, value, setValue }) {
  // Frissítjük az adatokat a formData objektumban
  const handleInputChange = (event) => {
    setValue(name, event.target.value);
  };

  return (
    <div className={styles.rangeContainer}>
      <label htmlFor={name}>
        {label}
        <span className={styles.rangeBox}>
          <input
            type='number'
            name={name}
            id={name}
            min={0}
            max={100}
            value={value}
            onChange={handleInputChange}
          />
          <p>px</p>
        </span>
      </label>
      <input
        type='range'
        name={name}
        id={name}
        min={0}
        max={100}
        value={value} // Bind range input to state
        onChange={handleInputChange}
      />
    </div>
  );
}

export default RangeInput;
