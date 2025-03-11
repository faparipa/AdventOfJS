// 'use client';
// import { useState } from 'react';
// import styles from './ExpandingCollapsing.module.css';

// export default function ExpandingCollapsingPage() {
//   // Track the expanded state for each question
//   const [expandedStates, setExpandedStates] = useState({});

//   // Toggle the expanded state for the clicked question
//   function handleExpand(questionId) {
//     setExpandedStates((prevStates) => ({
//       ...prevStates,
//       [questionId]: !prevStates[questionId],
//     }));
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.wrapper}>
//         <ul>
//           <li
//             key={'1'}
//             className={`${expandedStates['1'] ? styles.expand : ''}`}
//             onClick={() => handleExpand('1')}
//           >
//             <a href='#'>
//               <div className={styles.question}>
//                 <div className={styles['question-mark']}>
//                   {expandedStates['1'] ? (
//                     <img src='/question-2.svg' alt='question' />
//                   ) : (
//                     <img src='/question-1.svg' alt='question' />
//                   )}
//                 </div>
//                 <div className={styles.content}>
//                   Technically, Svelte is a library and SvelteKit is a framework.
//                   What's the difference?
//                 </div>
//               </div>
//             </a>
//             <div className={styles.answer}>
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
//                 eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//                 enim ad minim veniam, quis nostrud exercitation ullamco laboris
//                 nisi ut.
//               </p>

//               <p>
//                 Voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//                 Excepteur sint occaecat cupidatat non proident, sunt in culpa
//                 qui officia deserunt mollit anim id est laborum.
//               </p>
//             </div>
//           </li>

//           <li
//             key={'2'}
//             className={`${expandedStates['2'] ? styles.expand : ''}`}
//             onClick={() => handleExpand('2')}
//           >
//             <a href='#'>
//               <div className={styles.question}>
//                 <div className={styles['question-mark']}>
//                   {expandedStates['2'] ? (
//                     <img src='/question-2.svg' alt='question' />
//                   ) : (
//                     <img src='/question-1.svg' alt='question' />
//                   )}
//                 </div>
//                 <div className={styles.content}>
//                   Do you provide a certificate of completion?
//                 </div>
//               </div>
//             </a>
//             <div className={styles.answer}>
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
//                 eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//                 enim ad minim veniam, quis nostrud exercitation ullamco laboris
//                 nisi ut.
//               </p>

//               <p>
//                 Voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//                 Excepteur sint occaecat cupidatat non proident, sunt in culpa
//                 qui officia deserunt mollit anim id est laborum.
//               </p>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }
'use client';
import { useState } from 'react';
import styles from './ExpandingCollapsing.module.css';

const questions = [
  {
    id: '1',
    question:
      "Technically, Svelte is a library and SvelteKit is a framework. What's the difference?",
    answer: [
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.',
      'Voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    icon: '/question-1.svg',
  },
  {
    id: '2',
    question: 'Do you provide a certificate of completion?',
    answer: [
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.',
      'Voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    icon: '/question-2.svg',
  },
];

function QuestionItem({ question, expanded, onClick }) {
  return (
    <li
      className={`${styles.questionItem} ${expanded ? styles.expand : ''}`}
      onClick={onClick}
      aria-expanded={expanded}
    >
      <a href='#' className={styles.question}>
        <div className={styles['question-mark']}>
          <img src={question.icon} alt='question' />
        </div>
        <div className={styles.content}>{question.question}</div>
      </a>
      <div className={styles.answer} id={`answer-${question.id}`}>
        {question.answer.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </li>
  );
}

export default function ExpandingCollapsingPage() {
  const [expandedStates, setExpandedStates] = useState({});

  const handleExpand = (questionId) => () => {
    setExpandedStates((prevStates) => ({
      ...prevStates,
      [questionId]: !prevStates[questionId],
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ul>
          {questions.map((q) => (
            <QuestionItem
              key={q.id}
              question={q}
              expanded={expandedStates[q.id]}
              onClick={handleExpand(q.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
