import Modal from '../modalTemplate';
import ModalAlert from '../modalAlert';
import styles from './settings.module.css';
import Router from 'next/router';
import { useState } from 'react';

export default function EditRecurringBudget({ budget }) {
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
        id: budget.id,
        max: parseFloat(event.target.max.value)
      };
      const response = await fetch(`/api/recurringBudget`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      document.getElementById('edit-budget' + budget.id).click();
      await Router.push(
        {
          pathname: '/settings',
          query: {
            messageType: 'success',
            message: 'Recurring budget updated successfully',
            tab: 'budget'
          }
        },
        '/settings'
      );
    } catch (error) {
      setShow(true);
      timer();
    }
  };

  return (
    <>
      <Modal
        title={'Edit Recurring Budget: ' + budget.category.name}
        control={'edit-budget' + budget.id}
      >
        {show ? (
          <ModalAlert
            alertType="error"
            message="Budget could not be updated"
            handleClose={() => setShow(false)}
          />
        ) : (
          ''
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4">
            <div className="col-span-4 pb-2">
              <p className="whitespace-normal italic font-semibold text-primary">
                Changing a recurring budget will not update the budgets for the
                current month, but will apply to those created in the next
                month.
              </p>
            </div>
            <div className={styles.inputdiv}>
              <select
                className="select select-primary w-full max-w-xs"
                disabled
              >
                <option>{budget.category.name}</option>
              </select>
            </div>
            <div className={styles.dollar}>
              <p>$</p>
            </div>
            <div className={styles.inputdiv}>
              <input
                type="text"
                id="max"
                name="max"
                placeholder={budget.max.toFixed(2)}
                className="input input-bordered input-primary w-full max-w-xs"
                required
              />
            </div>
          </div>
          <div className="modal-action m-1">
            <button className="btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
