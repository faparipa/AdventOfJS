// 'use client';
// //TODO serverside validation
// import { useState, useRef } from 'react';
// import styles from './Verifier.module.css';

// export default function VerifierPage() {
//   const [code, setCode] = useState('');
//   const [error, setError] = useState('');
//   const [isVerified, setIsVerified] = useState(false);
//   const inputRefs = useRef([]);

//   const handleInputChange = (e, index) => {
//     const newCode =
//       code.slice(0, index) + e.target.value + code.slice(index + 1);
//     setCode(newCode);

//     // go to next input fiels
//     if (e.target.value && index < 3) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && !code[index] && index > 0) {
//       // delet- go back
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedValue = e.clipboardData.getData('Text').slice(0, 4); // Maximum 4 caracter
//     if (/^\d{4}$/.test(pastedValue)) {
//       setCode(pastedValue);
//       inputRefs.current[3].focus();
//     } else {
//       setError('Invalid paste. Please paste only a 4-digit number.');
//       setCode('');
//     }
//   };

//   const handleFocus = () => {
//     if (error) setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (code.length !== 4 || !/^\d{4}$/.test(code)) {
//       setError('Please enter a valid 4-digit code.');
//       return;
//     }

//     if (code === '1234') {
//       setIsVerified(true);
//       setError('');
//       setCode('');
//       setTimeout(() => setIsVerified(false), 3000);
//     } else {
//       setError('Incorrect code. Please try again.');
//       setCode('');
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.wrapper}>
//         <h1>Authorization Code</h1>
//         <p>Please enter the code that we sent to (***) *** - 2819.</p>
//         <form onSubmit={handleSubmit}>
//           <div className={styles.fields}>
//             {Array.from({ length: 4 }).map((_, index) => (
//               <input
//                 key={index}
//                 type='text'
//                 maxLength='1'
//                 value={code[index] || ''}
//                 ref={(el) => (inputRefs.current[index] = el)}
//                 onChange={(e) => handleInputChange(e, index)}
//                 onKeyDown={(e) => handleKeyDown(e, index)}
//                 onPaste={handlePaste}
//                 onFocus={handleFocus}
//                 pattern='\d*'
//                 inputMode='numeric'
//                 autoFocus={index === 0}
//               />
//             ))}
//           </div>
//           <button type='submit' className={styles.btn}>
//             Verify
//           </button>
//         </form>
//         {error && <p className={styles.error}>{error}</p>}
//         {isVerified && (
//           <p className={styles.success}>Code verified successfully!</p>
//         )}
//       </div>
//     </div>
//   );
// }
'use client';
import { useState, useRef } from 'react';
import styles from './Verifier.module.css';

export default function VerifierPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
    const newCode =
      code.slice(0, index) + e.target.value + code.slice(index + 1);
    setCode(newCode);

    if (e.target.value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedValue = e.clipboardData.getData('Text').slice(0, 4);
    if (/^\d{4}$/.test(pastedValue)) {
      setCode(pastedValue);
      inputRefs.current[3].focus();
    } else {
      setError('Invalid paste. Please paste only a 4-digit number.');
      setCode('');
    }
  };

  const handleFocus = () => {
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.length !== 4 || !/^\d{4}$/.test(code)) {
      setError('Please enter a valid 4-digit code.');
      return;
    }

    try {
      // Send the code to the backend (Next.js API route)
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsVerified(true);
        setError('');
        setCode('');
        setTimeout(() => setIsVerified(false), 3000);
      } else {
        setError(data.message);
        setCode('');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Authorization Code</h1>
        <p>Please enter the code that we sent to (***) *** - 2819.</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.fields}>
            {Array.from({ length: 4 }).map((_, index) => (
              <input
                key={index}
                type='text'
                maxLength='1'
                value={code[index] || ''}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                onFocus={handleFocus}
                pattern='\d*'
                inputMode='numeric'
                autoFocus={index === 0}
              />
            ))}
          </div>
          <button type='submit' className={styles.btn}>
            Verify
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {isVerified && (
          <p className={styles.success}>Code verified successfully!</p>
        )}
      </div>
    </div>
  );
}
