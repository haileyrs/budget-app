import Modal from '../modalTemplate';
import ErrorMessage from '../errorMessage';
import styles from './account.module.css';
import Router from 'next/router';

export default function EditAccount({ id, name, type, amount, plaid }) {
  let apiErr = false
  let errMessage = '';

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const data = {
        id: id,
        name: event.target.name.value != '' ? event.target.name.value : name,
        type: type,
        value: event.target.amount.value != '' ? parseFloat(event.target.amount.value) : amount
      };
      const response = await fetch(`/api/moneyAccount`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      document.getElementById(id).click();
      // console.log(result)
      await Router.push('/tabs/accounts');
    } catch (error) {
      console.log(error);
      errMessage = 'There was an error updating this account.'
      apiErr = true;
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/moneyAccount`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: id
      });
      const result = await response.json();
      console.log(result);
      await Router.push('/tabs/accounts');
    } catch (error) {
      console.log(error);
      errMessage = 'There was an error deleting this account.'
      apiErr = true;
    }
  };


  return (
    <>
      <Modal title="Update Account" control={id}>
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
                placeholder={amount}
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </div>
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
