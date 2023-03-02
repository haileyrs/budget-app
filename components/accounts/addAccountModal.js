import Modal from '../modalTemplate';
import styles from './account.module.css';
import Router from 'next/router';

export default function AddAccount({ user }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        userId: user.id,
        name: event.target.name.value,
        type: event.target.type.value,
        value: parseFloat(event.target.amount.value)
      };
      const response = await fetch(`/api/moneyAccount`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      document.getElementById('add-account-modal').click();
      console.log(result);
      await Router.push('/tabs/accounts');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal title="Add Account" control="add-account-modal">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4">
            <div className={styles.inputdiv}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="account name"
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </div>
            <div className={styles.inputdiv}>
              <select
                id="type"
                name="type"
                className="select select-primary w-full max-w-xs"
                defaultValue="account type"
              >
                <option disabled>account type</option>
                <option>Checking</option>
                <option>Savings</option>
                <option>Credit</option>
                <option>Investment</option>
                <option>Property</option>
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
                placeholder="current balance"
                className="input input-bordered input-primary w-full max-w-xs"
              />
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
