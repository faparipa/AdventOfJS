import styles from '@/app/2024/(challenges)/multistepform/MultiStepForm.module.css';

function RadioGrup({
  formData,
  radioList,
  handleRadioChange,
  setInputContain,
}) {
  function handleClick() {
    setInputContain('checkBoxGroup');
  }
  function handleBackClick() {
    setInputContain('inputField');
  }
  return (
    <>
      <div className={styles.radioGroup}>
        <h4>Favorite Reindeer*</h4>
        <div className={styles.radioContainer}>
          {radioList.map((rad) => (
            <div key={rad} className={styles.radioItem}>
              <input
                type='radio'
                id={rad}
                name='fav_reindeer'
                value={rad}
                checked={formData.fav_reindeer === rad}
                onChange={handleRadioChange}
                required
              />
              <label htmlFor={rad}>{rad}</label>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button
          type='button'
          className={styles.backBtn}
          onClick={handleBackClick}
        >
          &larr;
        </button>
        <button type='button' className={styles.btn} onClick={handleClick}>
          Next
        </button>
      </div>
    </>
  );
}

export default RadioGrup;
