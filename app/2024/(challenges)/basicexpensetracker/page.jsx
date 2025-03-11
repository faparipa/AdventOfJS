'use client';
import { useState } from 'react';
import styles from './expensetracker.module.css';

function ExpenseTrackerPage() {
  const [expenseData, setExpenseData] = useState([]);
  const [formData, setFormData] = useState({ vendor: '', amount: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newId = Math.random();
    const newVendor = formData.vendor;
    const newAmount = parseFloat(formData.amount);

    setExpenseData((prevData) => [
      ...prevData,
      { id: newId, vendor: newVendor, amount: newAmount },
    ]);

    setFormData({ vendor: '', amount: '' });
  };

  const deleteItem = (id) => {
    setExpenseData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const totalSpent = expenseData.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.expenseContainer}>
        <h2>Expense Tracker</h2>
        <form className={styles.inputsContainer} onSubmit={handleSubmit}>
          <div className={styles.vendorInput}>
            <label htmlFor='name'>Vendor</label>
            <input
              type='text'
              id='name'
              name='vendor'
              value={formData.vendor}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.amountInput}>
            <label htmlFor='amount'>Amount</label>
            <input
              type='number'
              step='0.01'
              id='amount'
              name='amount'
              required
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <button className={styles.checkBtn} type='submit'>
            <img src='/checkexp.svg' alt='checkikon' />
          </button>
        </form>
        {expenseData.length >= 1 && (
          <>
            <div className={styles.contains}>
              <ul>
                {expenseData.map((data) => (
                  <li key={data.id}>
                    <span>{data.vendor}</span>{' '}
                    <span className={styles.amount}>{data.amount} </span>
                    <img
                      src='/trash.svg'
                      alt='trashicon'
                      onClick={() => deleteItem(data.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.total}>
              <p>Total Spent</p>
              <p className={styles.amount}>{totalSpent.toFixed(2)}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ExpenseTrackerPage;
