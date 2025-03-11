'use client';
import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import { signup } from '@/actions/auth-action';
import styles from './FormValidation.module.css';

export default function FormValidationPage() {
  const [formState, formAction] = useActionState(signup, { errors: {} });
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const errors = formState?.errors || {}; // Ensure errors is always an object

  // Display the success message if there are no errors
  useEffect(() => {
    if (formState?.status === 'success') {
      setSuccessMessage('User signed up');

      const timeout = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [formState]);

  //   const handleShowPassword = (e) => {
  //     e.preventDefault();
  //     setShowPassword((prev) => !prev);
  //   };
  //   const handleShowConfirmPassword = (e) => {
  //     e.preventDefault();
  //     setShowConfirmPassword((prev) => !prev);
  //   };
  const handleShowPassword = (field) => (event) => {
    event.preventDefault();
    if (field === 'password') {
      setShowPassword((prev) => !prev);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  return (
    <div className={styles.container}>
      <form action={formAction}>
        <h1 className={styles.mainTitle}>Signup</h1>

        <div className={styles.field}>
          <input type='text' name='name' id='name' placeholder=' ' />
          <label htmlFor='name'>Name</label>
          {errors?.name && (
            <div className={styles.error}>
              <img src='/error.svg' alt='Error' />
              {errors.name}
            </div>
          )}
          <div className={styles.success}></div>
        </div>

        <div className={styles.field}>
          <input type='email' name='email' id='email' placeholder=' ' />
          <label htmlFor='email'>Email</label>
          {errors?.email && (
            <div className={styles.error}>
              <img src='/error.svg' alt='Error' />
              {errors.email}
            </div>
          )}
          <div className={styles.success}>
            <img src='/success.svg' alt='Success' />
          </div>
        </div>

        <div className={`${styles.field} ${showPassword ? styles.show : ''}`}>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            id='password'
            placeholder=' '
          />
          <label htmlFor='password'>Password</label>
          <button
            className={styles['show-hide']}
            onClick={handleShowPassword('password')}
          ></button>
          {errors?.password && (
            <div className={styles.error}>
              <img src='/error.svg' alt='Error' />
              {errors.password}
            </div>
          )}
          <div className={styles.success}></div>
        </div>

        <div
          className={`${styles.field} ${
            showConfirmPassword ? styles.show : ''
          }`}
        >
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name='confirm-password'
            id='confirm-password'
            placeholder=' '
          />
          <label htmlFor='confirm-password'>Confirm Password</label>
          <button
            className={styles['show-hide']}
            onClick={handleShowPassword('confirmPassword')}
          ></button>
          {errors?.confirmPassword && (
            <div className={styles.error}>
              <img src='/error.svg' alt='Error' />
              {errors.confirmPassword}
            </div>
          )}
          <div className={styles.success}></div>
        </div>

        <div className={styles.field}>
          <input
            type='submit'
            name='submit'
            value='Submit'
            disabled={Object.keys(errors).length > 0}
          />
        </div>

        {/* Displaying general error message below the submit button */}
        {Object.keys(errors).length > 0 && (
          <div className={styles.submitError}>
            <p>Please fix the errors above.</p>
          </div>
        )}

        {/* Displaying the success message when user is signed up */}
        {successMessage && (
          <div className={styles.submitSuccess}>
            <p>{successMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
}
