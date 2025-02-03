'use client';

//import Form from 'next/form';
import { useState, useEffect } from 'react';
import styles from './persisformdata.module.css';

export default function PersistFormData() {
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

  // Initialize state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    fav_reindeer: '',
    moviesWatched: [],
  });

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (formData) {
      localStorage.setItem('formData', JSON.stringify(formData));
    }
  }, [formData]);

  // Handle form input changes
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
      <h2>Persist Form Data</h2>
      <form className={styles.container} onSubmit={handleSubmit}>
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

        <div className={styles.checkboxGroup}>
          <h4>What holiday movies have you watched this year?</h4>
          <ul>
            {movies.map((movie, i) => (
              <li key={i}>
                <input
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

        <button type='submit' className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
