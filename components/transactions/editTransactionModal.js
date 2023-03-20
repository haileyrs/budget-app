import Modal from '../modalTemplate';
import ErrorMessage from '../errorMessage';
import styles from './transaction.module.css';
import { useState } from 'react';
import Router from 'next/router';
import DatePicker from 'tailwind-datepicker-react';

export default function EditTransaction({
  id,
  category,
  amount,
  moneyAccount,
  vendor,
  date,
  accounts,
  categories
}) {
  let apiErr = false;
  let errMessage = '';

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        transactionId: id,
        vendor:
          event.target.vendor.value != '' ? event.target.vendor.value : vendor,
        amount:
          event.target.amount.value != ''
            ? parseFloat(event.target.amount.value)
            : amount,
        categoryId: category.id,
        moneyAccountId: moneyAccount.id,
        date: selectedDate ? selectedDate : date
      };
      if (event.target.account.value != '') {
        const newAccount = accounts.find(
          (e) => e.name == event.target.account.value
        );
        data.moneyAccountId = newAccount.id;
      }

      if (event.target.category.value != '') {
        const newCategory = categories.find(
          (e) => e.name == event.target.category.value
        );
        data.categoryId = newCategory.id;
      }

      if (event.target.category.value != 'Income' && category != 'Income') {
        if (data.amount > 0) {
          data.amount *= -1;
        }
      }

      const response = await fetch(`/api/transaction`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      document.getElementById(id).click();
      // console.log(result)
      await Router.push('/tabs/transactions');
    } catch (error) {
      console.log(error);
      errMessage = 'There was an error updating this account.';
      apiErr = true;
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/transaction`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: id })
      });
      const result = await response.json();
      await Router.push('/tabs/transactions');
    } catch (error) {
      console.log(error);
      errMessage = 'There was an error deleting this transaction.';
      apiErr = true;
    }
  };

  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const handleChange = (selectedDate) => {
    setSelectedDate(selectedDate);
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
      input:
        'bg-base-100 text-neutral border-primary dark:bg-base-100 dark:text-neutral dark:border-primary',
      inputIcon: '',
      selected:
        'bg-primary text-primary-content dark:bg-primary dark:text-primary-content'
    },
    defaultDate: new Date(date),
    language: 'en'
  };

  return (
    <>
      <Modal title="Update Transaction" control={id}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4">
            <div className={styles.inputdiv}>
              <select
                id="account"
                name="account"
                className="select select-primary w-full max-w-xs"
                defaultValue={moneyAccount.name}
              >
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
                defaultValue={category.name}
              >
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
                placeholder={amount.toFixed(2)}
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </div>
            <div className={styles.inputdiv}>
              <input
                type="text"
                id="vendor"
                name="vendor"
                placeholder={vendor}
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </div>
            <div className={styles.inputdiv}>
              <DatePicker
                show={show}
                setShow={(state) => setShow(state)}
                options={options}
                onChange={handleChange}
              />
            </div>
            {/* <div className={styles.inputdiv}>
              <div className="flex">
                <input
                  type="number"
                  id="month"
                  name="month"
                  placeholder={month}
                  className="input input-bordered input-primary w-full max-w-xs"
                />
                <input
                  type="number"
                  id="day"
                  name="day"
                  placeholder={day}
                  className="input input-bordered input-primary w-full max-w-xs"
                />
              </div>
            </div>
            <div className={styles.inputdiv}>
              <input
                type="number"
                id="year"
                name="year"
                placeholder={year}
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </div> */}
          </div>
          {apiErr ? <ErrorMessage message={errMessage} /> : ''}

          <div className="modal-action m-1">
            <button className="btn btn-error" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
