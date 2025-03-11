import styles from '@/app/2024/(challenges)/multistepform/MultiStepForm.module.css';

function CheckBoxGroup({
  movies,
  formData,
  handleCheckboxChange,
  setInputContain,
  handleSubmit,
  isSubmitEnabled,
  submitMessage,
}) {
  function handleBackClick() {
    setInputContain('radioGroup');
  }

  return (
    <>
      <div className={styles.checkboxGroup}>
        <h4>What holiday movies have you watched this year?</h4>
        <ul>
          {movies.map((movie, i) => (
            <li key={i}>
              <input
                required
                type='checkbox'
                id={`movie-${i}`}
                name={`movie-${i}`}
                value={movie}
                checked={formData.moviesWatched.includes(movie)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={`movie-${i}`}>{movie}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.btnContainer}>
        <button
          type='button'
          className={styles.backBtn}
          onClick={handleBackClick}
        >
          &larr;
        </button>

        <button
          type='submit'
          className={styles.btn}
          onClick={handleSubmit}
          disabled={!isSubmitEnabled}
        >
          Submit
        </button>
        <h4 className={styles.submitMessage}>{submitMessage}</h4>
      </div>
    </>
  );
}

export default CheckBoxGroup;
