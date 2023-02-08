import Modal from "../modalTemplate";
import styles from "./budget.module.css";

export default function EditBudget({ name, amount }) {
  return (
    <>
      <Modal title="Edit Budget" control="edit-budget-modal">
        <div className="grid grid-cols-4">
          <div className={styles.inputdiv}>
            <select className="select select-primary w-full max-w-xs" disabled>
              <option>{name}</option>
            </select>
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
        <div className="modal-action m-0">
          <label className="btn">Save</label>
        </div>
      </Modal>
    </>
  );
}
