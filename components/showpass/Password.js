'use client';
import { Lock } from './Lock';
import { Eyeball } from './Eyeball';
import './password.css';
import { useState } from 'react';

const Password = () => {
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);

  const togglePassword = () => {
    setIsPasswordShowing(!isPasswordShowing);
  };

  return (
    <div
      className={`faux-box ${
        isPasswordShowing ? 'show-password' : 'hide-password'
      }`}
    >
      <Lock />
      {isPasswordShowing ? (
        <input type='text' name='password' className='password' />
      ) : (
        <input type='password' name='password' className='password' />
      )}
      <button onClick={togglePassword} className='toggle'>
        <Eyeball />
      </button>
    </div>
  );
};

export { Password };
