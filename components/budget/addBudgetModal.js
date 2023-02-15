import Modal from '../modalTemplate';
import styles from './budget.module.css';
import Router from 'next/router';

export default function AddBudget() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        userId: 1,
        category: event.target.category.value,
        max: parseFloat(event.target.max.value)
      };
      const response = await fetch(`/api/budget`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      // console.log(result);
      document.getElementById('add-budget-modal').click();
      await Router.push('/tabs/budgets');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal title="Add Budget" control="add-budget-modal">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4">
            <div className={styles.inputdiv}>
              <select
                id="category"
                name="category"
                className="select select-primary w-full max-w-xs"
                defaultValue="category name"
              >
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
                id="max"
                name="max"
                placeholder="amount"
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
