'use client';
import { useState } from 'react';
import styles from './TipCalculator.module.css';
import TipAmount from '@/components/tipCalkulator/TipAmount';
import TotalPerPerson from '@/components/tipCalkulator/TotalPerPerson';
import InputFields from '@/components/tipCalkulator/InputFields';
import TipPercentages from '@/components/tipCalkulator/TipPercentages';
import ButtonWrapper from '@/components/tipCalkulator/ButonWrapper';

export default function TipCalculatorPage() {
  const [state, setState] = useState({
    tipPercentage: 0.15,
    numberOfPeople: 3,
    billAmount: 102.02,
    tipAmount: (0.15 * 102.02).toFixed(2),
    totalPerPerson: ((102.02 + 0.15 * 102.02) / 3).toFixed(2),
  });

  function handleNumberOfPeople(event) {
    setState((prevState) => ({
      ...prevState,
      numberOfPeople: Number(event.target.value),
    }));
  }

  function handleBillAmount(event) {
    setState((prevState) => ({
      ...prevState,
      billAmount: Number(event.target.value),
    }));
  }

  function handleTipChange(event) {
    setState((prevState) => ({
      ...prevState,
      tipPercentage: Number(event.target.value),
    }));
  }

  function handleCalculate() {
    if (state.numberOfPeople <= 0 || state.billAmount <= 0) {
      alert('Please enter a valid bill amount and number of people.');
    } else {
      const calculatedTipAmount = (
        state.tipPercentage * state.billAmount
      ).toFixed(2);
      const totalPerPerson = (
        (state.billAmount + parseFloat(calculatedTipAmount)) /
        state.numberOfPeople
      ).toFixed(2);

      setState((prevState) => ({
        ...prevState,
        tipAmount: calculatedTipAmount,
        totalPerPerson: totalPerPerson,
      }));
    }
  }

  return (
    <div className={styles.container}>
      <h2>Tip calculator</h2>
      <div className={styles.wrapper}>
        <TipAmount tipAmount={state.tipAmount} />

        <TotalPerPerson totalPerPerson={state.totalPerPerson} />

        <InputFields
          billAmount={state.billAmount}
          numberOfPeople={state.numberOfPeople}
          onBillAmountChange={handleBillAmount}
          onNumberOfPeopleChange={handleNumberOfPeople}
        />
        <TipPercentages
          selectedTip={state.tipPercentage}
          onTipChange={handleTipChange}
        />

        <ButtonWrapper onClick={handleCalculate} />
      </div>
    </div>
  );
}
