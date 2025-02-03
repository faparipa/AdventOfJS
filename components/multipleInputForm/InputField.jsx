import styles from '@/app/2024/(challenges)/multistepform/MultiStepForm.module.css';

function InputField({ formData, handleInputChange, setInputContain }) {
  function handleClick() {
    if (formData.fullName === '') {
      alert('Full Name is required');
    } else if (formData.email === '') {
      alert('Email is required');
    } else {
      setInputContain('radioGroup');
    }
  }
  return (
    <>
      <div className={styles.inputField}>
        <label htmlFor='fullName'>Full Name*</label>
        <input
          type='text'
          id='fullName'
          name='fullName'
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />

        <label htmlFor='email'>Email Address*</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.btnContainer}>
        <button type='button' className={styles.btn} onClick={handleClick}>
          Next
        </button>
      </div>
    </>
  );
}

export default InputField;
