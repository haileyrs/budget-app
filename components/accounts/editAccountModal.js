import Modal from '../modalTemplate';
import styles from './account.module.css';

export default function EditAccount({ id, name, type, amount, plaid }) {
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const data = {
        id: id,
        name: event.target.name.value != '' ? event.target.name.value : name,
        type: type,
        value: event.target.amount.value != '' ? parseFloat(event.target.amount.value) : amount
      };
      const response = await fetch(`/api/account`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log(result)
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    // bleh
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
          <div className="modal-action m-1">
            <button className="btn btn-error">Delete</button>
            <button className="btn" type="submit">Save</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
