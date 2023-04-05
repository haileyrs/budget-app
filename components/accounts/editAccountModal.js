import Modal from '../modalTemplate';
import Alert from '../alert';
import styles from './account.module.css';
import Router from 'next/router';
import { useState } from 'react';

export default function EditAccount({ id, name, type, amount, plaid }) {
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
    event.preventDefault()
    try {
      const data = {
        accountId: id,
        name: event.target.name.value != '' ? event.target.name.value : name,
        type: type,
        value:
          event.target.amount.value != ''
            ? parseFloat(event.target.amount.value)
            : amount
      };
      if (data.type == 'Loan' || data.type == 'Credit') {
        if (data.value > 0) {
          data.value *= -1;
        }
      }
      const response = await fetch(`/api/moneyAccount`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      document.getElementById(id).click();
      await Router.push(
        {
          pathname: '/tabs/accounts',
          query: {
            messageType: 'success',
            message: 'Account was successfully updated'
          }
        },
        '/tabs/accounts'
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
      const response = await fetch(`/api/moneyAccount`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId: id })
      });
      const result = await response.json();
      
      await Router.push(
        {
          pathname: '/tabs/accounts',
          query: {
            messageType: 'success',
            message: 'Account was successfully deleted'
          }
        },
        '/tabs/accounts'
      );
    } catch (error) {
      console.log(error);
      setShow(true);
      timer();
    }
  };

  return (
    <>
      <Modal title="Update Account" control={id}>
        {show ? (
          <Alert
            alertType="error"
            message="Account could not be updated"
            handleClose={() => setShow(false)}
          />
        ) : (
          ''
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4">
            <div className={styles.inputdiv}>
              {/* if plaid account, do not allow name change, add disabled input */}
              <input
                type="text"
                id="name"
                name="name"
                placeholder={name}
                className="input input-bordered input-primary w-full max-w-xs"
              />
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
