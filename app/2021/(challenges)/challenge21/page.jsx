'use client';
import { useState } from 'react';
import styles from './SimplifiedBudget.module.css';

export default function SimplifiedBudgetPage() {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  // Calculate total expenses
  const totalExpenses = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount || 0),
    0
  );
  const balance = parseFloat(budget) - totalExpenses;

  // Handle budget change (on blur or change)
  function handleBudgetChange(e) {
    setBudget(e.target.value);
  }

  // Handle expense name change
  function handleExpenseNameChange(e) {
    setExpenseName(e.target.value);
  }

  // Handle expense amount change
  function handleExpenseAmountChange(e) {
    setExpenseAmount(e.target.value);
  }

  // Add expense
  function handleAddExpense(e) {
    e.preventDefault();
    if (expenseName && expenseAmount) {
      setExpenses([
        ...expenses,
        { id: Date.now(), name: expenseName, amount: expenseAmount },
      ]);
      setExpenseName('');
      setExpenseAmount('');
    }
  }

  // Remove expense
  function handleRemoveExpense(id) {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  // Summary class based on balance
  const balanceClass = balance >= 0 ? styles.positive : styles.negative;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles['add-panel']}>
          <h1 className={styles.mainTitle}>Simplified Budget</h1>
          <div className={styles.field}>
            <input
              type='number'
              name='income'
              id='income'
              value={budget}
              onBlur={handleBudgetChange}
              onChange={handleBudgetChange}
            />
            <label htmlFor='income'>Budget Amount</label>
          </div>

          <form className={styles['add-expense']} onSubmit={handleAddExpense}>
            <div className={styles.field}>
              <input
                type='text'
                name='expense-name'
                id='expense-name'
                value={expenseName}
                onChange={handleExpenseNameChange}
              />
              <label htmlFor='expense-name'>Expense</label>
            </div>
            <div className={styles.field}>
              <input
                type='number'
                name='expense-amount'
                id='expense-amount'
                value={expenseAmount}
                onChange={handleExpenseAmountChange}
              />
              <label htmlFor='expense-amount'>Amount</label>
            </div>
            <button
              name='add-expense-button'
              id='add-expense-button'
              className={styles['add-expense-button']}
            >
              <img src='/plus.svg' alt='Plus' />
            </button>
          </form>
        </div>

        <div className={styles['expenses-panel']}>
          <h2>Expenses</h2>

          {expenses.map((expense) => (
            <div className={styles['expense-table']} key={expense.id}>
              <div>{expense.name}</div>
              <div>${expense.amount}</div>
              <div className={styles.delete}>
                <button
                  name='delete-expense'
                  className={styles['delete-expense']}
                  onClick={() => handleRemoveExpense(expense.id)}
                >
                  <img src='/trash.svg' alt='Trash' />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles['summary-panel']}>
          <div className={styles['summary-item']}>
            <div className={styles['summary-label']}>Income</div>
            <div className={styles['summary-amount']}>${budget}</div>
          </div>

          <div className={styles['summary-item']}>
            <div className={styles['summary-label']}>Expenses</div>
            <div className={styles['summary-amount']}>
              ${totalExpenses.toFixed(2)}
            </div>
          </div>

          <div className={styles['summary-item']}>
            <div className={styles['summary-label']}>Balance</div>
            <div className={`${styles['summary-amount']} ${balanceClass}`}>
              ${balance.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
