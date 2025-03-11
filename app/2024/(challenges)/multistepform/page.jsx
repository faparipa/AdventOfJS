'use client';
import { useEffect, useState } from 'react';
import styles from './MultiStepForm.module.css';
import InputField from '@/components/multipleInputForm/InputField';
import RadioGrup from '@/components/multipleInputForm/radioGrup';
import CheckBoxGroup from '@/components/multipleInputForm/checkBoxGroup';

const radioList = [
  'Dasher',
  'Dancer',
  'Prancer',
  'Vixen',
  'Comet',
  'Cupid',
  'Donner',
  'Blitzen',
  'Rudolph',
];

const movies = [
  'Elf',
  'Home Alone (1990)',
  'The Grinch (1996)',
  "It's a Wonderful Life (1946)",
  'Die Hard (1988)',
];

function MultiStepPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    fav_reindeer: '',
    moviesWatched: [],
  });

  const [inputContain, setInputContain] = useState('inputField');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  useEffect(() => {
    if (
      formData.fullName &&
      formData.email &&
      formData.fav_reindeer &&
      formData.moviesWatched.length > 0
    ) {
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(false);
    }
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedMovies = checked
        ? [...prevData.moviesWatched, value]
        : prevData.moviesWatched.filter((movie) => movie !== value);
      return { ...prevData, moviesWatched: updatedMovies };
    });
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      fav_reindeer: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    localStorage.removeItem('formData');

    setSubmitMessage('Submitted'); // Set the submitted message

    setFormData({
      fullName: '',
      email: '',
      fav_reindeer: '',
      moviesWatched: [],
    });

    // Show the message for 3 seconds before resetting the form
    setTimeout(() => {
      setSubmitMessage(''); // Reset the message after 3 seconds
      setInputContain('inputField'); // Go back to the first page
    }, 1000);
  };

  return (
    <div>
      <h2>Multi Step Form</h2>
      <form className={styles.container} onSubmit={handleSubmit}>
        {inputContain === 'inputField' && (
          <InputField
            formData={formData}
            handleInputChange={handleInputChange}
            setInputContain={setInputContain}
          />
        )}
        {inputContain === 'radioGroup' && (
          <RadioGrup
            formData={formData}
            radioList={radioList}
            handleRadioChange={handleRadioChange}
            setInputContain={setInputContain}
          />
        )}
        {inputContain === 'checkBoxGroup' && (
          <CheckBoxGroup
            movies={movies}
            formData={formData}
            handleCheckboxChange={handleCheckboxChange}
            setInputContain={setInputContain}
            handleSubmit={handleSubmit}
            isSubmitEnabled={isSubmitEnabled}
            submitMessage={submitMessage}
          />
        )}
      </form>
    </div>
  );
}

export default MultiStepPage;
