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

  useEffect(() => {
    if (formData) {
      localStorage.setItem('formData', JSON.stringify(formData));
    }
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Clear localStorage and reset form data
    localStorage.removeItem('formData');
    setFormData({
      fullName: '',
      email: '',
      fav_reindeer: '',
      moviesWatched: [],
    });
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
          />
        )}
      </form>
    </div>
  );
}

export default MultiStepPage;
