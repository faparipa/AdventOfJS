'use client';
import { useState, useEffect } from 'react';
import styles from './Toaster.module.css';

export default function ToasterPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Handle closing the toaster
  function handleClose() {
    setIsOpen(false);
  }

  // Handle exit intent (mouse moving toward the top)
  function handleMouseMove(event) {
    if (event.clientY < 50 && !isOpen && !emailSubmitted) {
      setIsOpen(true);
    }
  }

  // Set timeout to show toaster after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!emailSubmitted) {
        setIsOpen(true);
      }
    }, 15000); // 15 seconds

    // Cleanup timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [emailSubmitted]);

  // Attach the mouse move listener for exit intent
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen, emailSubmitted]);

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    console.log('Email submitted:', email);
    setEmailSubmitted(true); // Prevent the toaster from showing again
    setIsOpen(false); // Close the toaster immediately after submission
  }

  return (
    <div className={styles.container}>
      <h3>
        Move your mouse toward the top of the page or wait on the site for more
        than 15 seconds
      </h3>
      {/* <!-- 👇🏻 ADD / REMOVE A CLASS OF COLLAPSED 👇🏻 --> */}
      <div
        className={
          isOpen ? styles.toaster : `${styles.toaster} ${styles.collapsed}`
        }
      >
        <div className={styles.close}>
          <button
            className={styles.closeToaster}
            id='closeToaster'
            onClick={handleClose}
          >
            <img src='/close.svg' alt='Close' /> Close
          </button>
        </div>
        <img
          src='/cover.jpg'
          alt='Compressed.fm Cover'
          className={styles.cover}
        />
        <h1>
          GET FREE
          <br />
          STUFF
          <br />
          IN YOUR INBOX
        </h1>
        <p>
          We try to include additional information and companion resources with
          each podcast episode. Sign up now to be included in the fun.
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor='email'>Email Address</label>
            <input type='email' name='email' id='email' required />
          </div>
          <button className={styles.submit} id='submit'>
            <img src='/arrow.svg' alt='Arrow' />
          </button>
        </form>
      </div>
    </div>
  );
}
