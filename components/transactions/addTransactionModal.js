import Modal from '../modalTemplate';
import styles from './transaction.module.css';
import { useState } from 'react';
import Router from 'next/router';
import DatePicker from 'tailwind-datepicker-react';

export default function AddTransaction({ user, categories, accounts }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newAccount = accounts.find(e => e.name == event.target.account.value)
      const newCategory = categories.find(
        (e) => e.name == event.target.category.value
      );
      const data = {
        vendor: event.target.vendor.value,
        amount: parseFloat(event.target.amount.value),
        categoryId: newCategory.id,
        moneyAccountId: newAccount.id,
        date: selectedDate ? selectedDate : new Date().toISOString()
      };
      if (event.target.category.value != 'Income') {
        if (data.amount > 0) {
          data.amount *= -1;
        }
      }
      const response = await fetch(`/api/transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      document.getElementById('add-transaction-modal').click();
      await Router.push(
        {
          pathname: '/tabs/transactions',
          query: {
            messageType: 'success',
            message: 'Transaction added successfully'
          }
        },
        '/tabs/transactions'
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  const [show, setShow] = useState(false);  
  const [selectedDate, setSelectedDate] = useState()
  const handleChange = (selectedDate) => {
    setSelectedDate(selectedDate)
  };
  const options = {
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date('2030-01-01'),
    minDate: new Date('1950-01-01'),
    theme: {
      background: '',
      todayBtn: '',
      clearBtn:
        'bg-primary text-primary-content dark:bg-primary dark:text-primary-content',
      icons: '',
      text: '',
      disabledText: 'text-secondary dark:text-secondary',
      input: 'bg-base-100 text-neutral border-primary dark:bg-base-100 dark:text-neutral dark:border-primary',
      inputIcon: '',
      selected:
        'bg-primary text-primary-content dark:bg-primary dark:text-primary-content'
    },
    defaultDate: new Date(),
    language: 'en'
  };

  return (
    <>
      <Modal title="Add Transaction" control="add-transaction-modal">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4">
            <div className={styles.inputdiv}>
              <select
                id="account"
                name="account"
                className="select select-primary w-full max-w-xs"
                defaultValue="account"
                required
              >
                <option disabled>account</option>
                {accounts.map((a) => (
                  <option key={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.inputdiv}>
              <select
                id="category"
                name="category"
                className="select select-primary w-full max-w-xs"
                defaultValue="category"
                required
              >
                <option disabled>category</option>
                {categories.map((c) => (
                  <option key={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.dollar}>
              <p>$</p>
            </div>
            <div className={styles.inputdiv}>
              <input
                type="text"
                id="amount"
                name="amount"
                placeholder="amount"
                className="input input-bordered input-primary w-full max-w-xs"
                required
              />
            </div>
            <div className={styles.inputdiv}>
              <input
                type="text"
                id="vendor"
                name="vendor"
                placeholder="vendor"
                className="input input-bordered input-primary w-full max-w-xs"
                required
              />
            </div>
            <div className={styles.inputdiv}>
              <DatePicker
                show={show}
                setShow={(state) => setShow(state)}
                options={options}
                onChange={handleChange}
              />
              {/* <div>
                <input
                  type="text"
                  placeholder="Select Date"
                  onFocus={() => setShow(true)}
                  readOnly
                  className="input input-bordered input-primary w-full max-w-xs"
                />
              </div> */}
            </div>
          </div>
          <div className="modal-action m-0">
            <button className="btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
