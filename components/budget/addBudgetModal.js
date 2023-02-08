import Modal from '../modalTemplate';
import styles from './budget.module.css';

export default function AddBudget() {
  return (
    <>
      <Modal title="Add Budget" control="add-budget-modal">
        <div className="grid grid-cols-4">
          <div className={styles.inputdiv}>
            <select className="select select-primary w-full max-w-xs" defaultValue="category name">
              {/* include options that plaid gives i think? don't include if a budget already exists, use edit feature */}
              <option disabled>category name</option>
              <option>Clothing</option>
              <option>Mortgage/Rent</option>
              <option>Groceries</option>
              <option>Dining Out</option>
              <option>Fun</option>
            </select>
          </div>
          <div className={styles.dollar}>
            <h2>$</h2>
          </div>
          <div className={styles.inputdiv}>
            <input
              type="text"
              placeholder="amount"
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
