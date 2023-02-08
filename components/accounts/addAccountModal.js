import Modal from "../modalTemplate";
import styles from "./account.module.css";

export default function AddAccount() {
  return (
    <>
      <Modal title="Add Account" control="add-account-modal">
        <div className="grid grid-cols-4">
          <div className={styles.inputdiv}>
            <input
              type="text"
              placeholder="account name"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className={styles.inputdiv}>
            <select className="select select-primary w-full max-w-xs" defaultValue="account type">
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
              placeholder="current balance"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
        </div>
        <div className="modal-action m-0">
          <label className="btn">Save</label>
        </div>
      </Modal>
    </>
  );
}
