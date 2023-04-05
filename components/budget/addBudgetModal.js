import Modal from '../modalTemplate';
import styles from './budget.module.css';
import Router from 'next/router';

export default function AddBudget({ user, categories }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const category = categories.find(
        (e) => e.name == event.target.category.value
      );
      const data = {
        userId: user.id,
        categoryId: category.id,
        max: parseFloat(event.target.max.value),
      };
      const response = await fetch(`/api/budget`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      document.getElementById('add-budget-modal').click();
      await Router.push(
        {
          pathname: '/tabs/budgets',
          query: {
            messageType: 'success',
            message: 'Budget added successfully'
          }
        },
        '/tabs/budgets'
      );
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
                defaultValue="category"
                required
              >
                <option disabled>category</option>
                {categories.map((c) => (
                  <option key={c.id}>{c.name}</option>
                ))}
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
                required
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
