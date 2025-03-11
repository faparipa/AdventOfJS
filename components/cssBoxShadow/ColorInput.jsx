// import styles from './ColorInput.module.css';

// function ColorInput({ label, name }) {
//   return (
//     <div className={styles.colorContainer}>
//       <label htmlFor={name}>{label}</label>
//       <div>
//         <p className={styles.colorBox}></p>
//         <input type='text' name={name} id={name} className={styles.rangeBox} />
//       </div>
//     </div>
//   );
// }

// export default ColorInput;
// import styles from './ColorInput.module.css';

// function ColorInput({ label, name, value, setValue }) {
//   const handleInputChange = (event) => {
//     setValue(name, event.target.value);
//   };

//   return (
//     <div className={styles.colorContainer}>
//       <label htmlFor={name}>{label}</label>
//       <div>
//         <p className={styles.colorBox}></p>
//         <input
//           type='text'
//           name={name}
//           id={name}
//           className={styles.rangeBox}
//           value={value}
//           onChange={handleInputChange}
//         />
//       </div>
//     </div>
//   );
// }

// export default ColorInput;
import styles from './ColorInput.module.css';

function ColorInput({ label, name, value, setValue }) {
  const handleInputChange = (event) => {
    setValue(name, event.target.value);
  };

  return (
    <div className={styles.colorContainer}>
      <label htmlFor={name}>{label}</label>
      <div>
        <p
          className={styles.colorBox}
          style={{ backgroundColor: value }} // Szín dinamikus változása
        ></p>
        <input
          type='text'
          name={name}
          id={name}
          className={styles.rangeBox}
          value={value}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default ColorInput;
