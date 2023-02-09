import Modal from '../modalTemplate';
import styles from './account.module.css';

// will need to add function that updates updated date automatically

export default function EditAccount({ name, amount, plaid }) {
  return (
    <>
      <Modal title="Update Account" control="edit-account-modal">
        <div className="grid grid-cols-4">
          <div className={styles.inputdiv}>
            {/* if plaid account, do not allow name change, add disabled input */}
            <input
              type="text"
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
              placeholder={amount}
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
        </div>
        <div className="modal-action m-1">
          <label className="btn btn-error">Delete</label>
          <label className="btn">Save</label>
        </div>
      </Modal>
    </>
  );
}
