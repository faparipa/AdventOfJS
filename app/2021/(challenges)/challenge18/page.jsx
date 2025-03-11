'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './PasswordGenerator.module.css';

export default function PasswordGeneratorPage() {
  const [passLength, setPassLength] = useState(12);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeSimilar, setIncludeSimilar] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  // Characters set definitions
  const symbols = '@#$%^&*!';
  const numbers = '0123456789';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const similarCharacters = 'il1Lo0O';

  const characterSets = useMemo(() => {
    return {
      symbols: includeSymbols ? symbols : '',
      numbers: includeNumbers ? numbers : '',
      lowercase: includeLowercase ? lowercase : '',
      uppercase: includeUppercase ? uppercase : '',
      similar: includeSimilar ? similarCharacters : '',
    };
  }, [
    includeSymbols,
    includeNumbers,
    includeLowercase,
    includeUppercase,
    includeSimilar,
  ]);

  // Generate password based on selected options
  const generatePassword = useCallback(() => {
    let characters = '';
    let selectedTypes = [];

    // Concatenate all the selected character sets
    Object.keys(characterSets).forEach((key) => {
      characters += characterSets[key];
      if (characterSets[key]) selectedTypes.push(key);
    });

    // If no characters are selected, fallback to lowercase
    if (characters === '') {
      characters = ' ';
      selectedTypes.push(' ');
    }

    let generatedPassword = '';
    let passwordIncludesAllTypes = false;

    // Ensure password includes at least one character from each selected type
    while (!passwordIncludesAllTypes) {
      generatedPassword = '';
      passwordIncludesAllTypes = true;

      // Generate the password by picking random characters from the available set
      for (let i = 0; i < passLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        generatedPassword += characters[randomIndex];
      }

      // Check if the generated password contains at least one character from each selected type
      for (const type of selectedTypes) {
        switch (type) {
          case 'symbols':
            if (
              !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(generatedPassword)
            ) {
              passwordIncludesAllTypes = false;
            }
            break;
          case 'numbers':
            if (!/\d/.test(generatedPassword)) {
              passwordIncludesAllTypes = false;
            }
            break;
          case 'lowercase':
            if (!/[a-z]/.test(generatedPassword)) {
              passwordIncludesAllTypes = false;
            }
            break;
          case 'uppercase':
            if (!/[A-Z]/.test(generatedPassword)) {
              passwordIncludesAllTypes = false;
            }
            break;
          case 'similar':
            if (!/[il1Lo0O]/.test(generatedPassword)) {
              passwordIncludesAllTypes = false;
            }
            break;
          default:
            break;
        }
      }
    }

    setPassword(generatedPassword);
  }, [characterSets, passLength]);

  // Handle password length change from slider
  function handlePassLengthChange(event) {
    setPassLength(Number(event.target.value));
  }

  // Handle checkbox changes for options
  function handleCheckboxChange(event) {
    const { name, checked } = event.target;
    switch (name) {
      case 'symbols':
        setIncludeSymbols(checked);
        break;
      case 'numbers':
        setIncludeNumbers(checked);
        break;
      case 'lowercase':
        setIncludeLowercase(checked);
        break;
      case 'uppercase':
        setIncludeUppercase(checked);
        break;
      case 'similar':
        setIncludeSimilar(checked);
        break;
      default:
        break;
    }
  }

  // Handle copy to clipboard action
  function handleCopyClick() {
    navigator.clipboard.writeText(password);
    setCopied(true);

    // Remove "copied" class after 5 seconds
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }

  // Trigger password generation on changes
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // Check if at least one option is selected
  const isCopyButtonDisabled = !(
    includeSymbols ||
    includeNumbers ||
    includeLowercase ||
    includeUppercase ||
    includeSimilar
  );

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.field}>
          <input
            type='text'
            name='password'
            id='password'
            value={password}
            readOnly
            aria-label='Generated password'
          />
          <button
            className={`${styles.copy} ${copied ? styles.copied : ''}`}
            onClick={handleCopyClick}
            aria-label='Copy password to clipboard'
            disabled={isCopyButtonDisabled} // Disable the button if no options are selected
          >
            <svg
              width='55'
              height='55'
              viewBox='0 0 55 55'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M37.3147 2.83081H20.6332C18.1514 2.83081 16.1332 4.85131 16.1332 7.33081V38.8308C16.1332 41.3126 18.1514 43.3308 20.6332 43.3308H43.1332C45.6149 43.3308 47.6332 41.3126 47.6332 38.8308V13.1493L37.3147 2.83081ZM43.1354 38.8308H20.6332V7.33081H34.1332V16.3308H43.1332L43.1354 38.8308Z' />
              <path d='M11.6332 11.8308H7.13318V47.8308C7.13318 50.3126 9.15143 52.3308 11.6332 52.3308H38.6332V47.8308H11.6332V11.8308Z' />
            </svg>
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        <div className={styles.field}>
          <input
            type='range'
            name='length'
            id='length'
            value={passLength}
            step={1}
            onChange={handlePassLengthChange}
            min='6'
            max='32'
            aria-label='Password length'
          />
          <span id='lengthText'>{passLength}</span> characters
        </div>

        {['symbols', 'numbers', 'lowercase', 'uppercase', 'similar'].map(
          (option) => (
            <div className={styles.field} key={option}>
              <input
                type='checkbox'
                name={option}
                id={option}
                checked={eval(
                  `include${option.charAt(0).toUpperCase() + option.slice(1)}`
                )}
                onChange={handleCheckboxChange}
                aria-label={`Include ${
                  option.charAt(0).toUpperCase() + option.slice(1)
                }`}
              />
              <label htmlFor={option}>
                <strong>{`Include ${
                  option.charAt(0).toUpperCase() + option.slice(1)
                }`}</strong>
              </label>
            </div>
          )
        )}
      </div>
    </div>
  );
}
