import Modal from '../modalTemplate';
import Alert from '../alert';
import { useState } from 'react';
import Router from 'next/router';
import DatePicker from 'tailwind-datepicker-react';
import { datePickerOptions } from '@/utils/helpers';

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

  const [show, setShow] = useState(false);
  const timer = () => {
    const time = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => {
      clearTimeout(time);
    };
  };

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
      await Router.push(
        {
          pathname: '/tabs/transactions',
          query: {
            messageType: 'success',
            message: 'Transaction was successfully updated'
          }
        },
        '/tabs/transactions'
      );
    } catch (error) {
      console.log(error);
      setShow(true);
      timer();
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
      await Router.push(
        {
          pathname: '/tabs/transactions',
          query: {
            messageType: 'success',
            message: 'Transaction was successfully deleted'
          }
        },
        '/tabs/transactions'
      );
    } catch (error) {
      console.log(error);
      setShow(true);
      timer();
    }
  };

  const [showDate, setShowDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const handleChange = (selectedDate) => {
    setSelectedDate(selectedDate);
  };

  return (
    <>
      <Modal title="Update Transaction" control={id}>
        {show ? (
          <Alert
            alertType="error"
            message="Transaction could not be updated"
            handleClose={() => setShow(false)}
          />
        ) : (
          ''
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4">
            <div className="input-div">
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
            <div className="input-div">
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
            <div className="dollar-sign">
              <p>$</p>
            </div>
            <div className="input-div">
              <input
                type="text"
                id="amount"
                name="amount"
                placeholder={amount.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </div>
            <div className="input-div">
              <input
                type="text"
                id="vendor"
                name="vendor"
                placeholder={vendor}
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </div>
            <div className="input-div">
              <DatePicker
                show={showDate}
                setShow={(state) => setShowDate(state)}
                options={datePickerOptions(date)}
                onChange={handleChange}
              />
            </div>
          </div>
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
