import Modal from '../modalTemplate';
import Alert from '../alert';
import Router from 'next/router';
import { useState } from 'react';

export default function EditBudget({ id, name, amount }) {
  const [show, setShow] = useState(false);
  const timer = () => {
    const time = setTimeout(() => {
      setShow(false)
    }, 5000);
    return () => {
      clearTimeout(time);
    };
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        id: id,
        max: event.target.amount.value != ''
            ? parseFloat(event.target.amount.value)
            : amount
      };
      const response = await fetch(`/api/budget`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      document.getElementById(id).click();
      await Router.push(
        {
          pathname: '/tabs/budgets',
          query: {
            messageType: 'success',
            message: 'Budget was successfully updated'
          }
        },
        '/tabs/budgets'
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
      const response = await fetch(`/api/budget`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
      });
      const result = await response.json();
      await Router.push(
        {
          pathname: '/tabs/budgets',
          query: {
            messageType: 'success',
            message: 'Budget was successfully deleted'
          }
        },
        '/tabs/budgets'
      );
    } catch (error) {
      console.log(error);
      setShow(true);
      timer();
    }
  };

  return (
    <>
      <Modal title="Edit Budget" control={id}>
        {show ? (
          <Alert
            alertType="error"
            message="Budget item could not be updated"
            handleClose={() => setShow(false)}
          />
        ) : (
          ''
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4">
            <div className="input-div">
              <select
                className="select select-primary w-full max-w-xs"
                disabled
              >
                <option>{name}</option>
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
                required
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
