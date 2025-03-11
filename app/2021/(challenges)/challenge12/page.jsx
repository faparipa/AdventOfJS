'use client';

import { useState } from 'react';
import styles from './RockPaperScissors.module.css';
import WinnerPage from '@/components/RockPaperScissors/WinnerPage';

export default function RockPaperScissorsPage() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [gameOver, setGameOver] = useState(false); // Track if the game is over

  const choices = ['rock', 'paper', 'scissors'];

  const getComputerChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const determineWinner = (user, computer) => {
    if (user === computer) return "It's a tie!";
    if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      return 'You win';
    }
    return 'Computer wins';
  };

  const handleChoice = (choice) => {
    const compChoice = getComputerChoice();
    const gameResult = determineWinner(choice, compChoice);

    setUserChoice(choice);
    setComputerChoice(compChoice);
    setResult(gameResult);
    setGameOver(true); // End the game after a choice
  };

  const playAgain = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
    setGameOver(false); // Restart the game
  };

  if (gameOver) {
    return (
      <WinnerPage
        userChoice={userChoice}
        computerChoice={computerChoice}
        result={result}
        playAgain={playAgain}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Pick one</h1>
        <ul>
          {choices.map((choice) => (
            <li key={choice} className={styles['pick-one']}>
              <button onClick={() => handleChoice(choice)}>
                <img
                  src={`/${choice}.png`}
                  alt={choice.charAt(0).toUpperCase() + choice.slice(1)}
                />
                {choice}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
