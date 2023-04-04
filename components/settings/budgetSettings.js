import styles from './settings.module.css';
import ButtonLayout from '../addNewButtonLayout';
import EditRecurringBudget from './editRecurringBudget';
import Router from 'next/router';

export default function BudgetSettings({ recurringBudgets = [], categories = [], user }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const category = categories.find(
        (e) => e.name == event.target.category.value
      );
      const data = {
        userId: user.id,
        categoryId: category.id,
        max: parseFloat(event.target.max.value)
      };
      const response = await fetch(`/api/recurringBudget`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      await Router.push(
        {
          pathname: '/settings',
          query: {
            messageType: 'success',
            message: 'Recurring budget added successfully',
            tab: 'budget'
          }
        },
        '/settings'
      );
    document.getElementById('budgetForm').reset();
    document.activeElement.blur();
    } catch (error) {
      console.log(error);
    }
  };

  const removeBudget = async (event, b) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/recurringBudget`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: b.id })
      });
      const result = await response.json();
      await Router.push(
        {
          pathname: '/settings',
          query: {
            messageType: 'success',
            message: 'Recurring budget was successfully deleted',
            tab: 'budget'
          }
        },
        '/settings'
      );
    } catch (error) {
      console.log(error);
      await Router.push(
        {
          pathname: '/settings',
          query: {
            messageType: 'error',
            message: 'Recurring budget could not be added',
            tab: 'budget'
          }
        },
        '/settings'
      );
    }
  };

  const budgetCategories = recurringBudgets.map((b) => b.category.name);
  const availableCategories = categories.filter(
    (c) => !budgetCategories.includes(c.name)
  );

  return (
    <>
      <div className={styles.container}>
        <article className="prose">
          <h2>Budgets</h2>
        </article>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-sm gap-2 mt-2">
            <ButtonLayout />
          </label>
          <div
            tabIndex={0}
            className="dropdown-content card card-bordered bg-base-100 p-2 w-60"
          >
            <div className="flex m-2">
              <div className="grid grid-cols-1">
                <p className="italic font-semibold text-primary">
                  Add a recurring budget
                </p>
                <div className="flex flex-row pt-1">
                  <form id="budgetForm" onSubmit={handleSubmit}>
                    <select
                      id="category"
                      name="category"
                      className="select select-primary w-full max-w-xs"
                      defaultValue="category"
                      required
                    >
                      <option disabled>category</option>
                      {availableCategories.map((c) => (
                        <option key={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      name="max"
                      id="max"
                      placeholder="limit"
                      className="input input-bordered input-primary w-1/2 my-1"
                      required
                    />
                    <button className="btn ml-2" type="submit">
                      Add
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {recurringBudgets.length === 0 ? (
        <p>No recurring budgets have been added.</p>
      ) : (
        <div className="flex w-full overflow-x-auto col-span-1 sm:col-span-2">
          <table className="table table-zebra table-compact w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Limit</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {recurringBudgets.map((b) => (
                <tr key={b.id}>
                  <th>{b.category.name}</th>
                  <td>${b.max.toFixed(2)}</td>
                  <td>
                    <label
                      htmlFor={'edit-budget' + b.id}
                      className="btn btn-sm mr-2"
                    >
                      Edit
                    </label>
                    <EditRecurringBudget budget={b} />
                    <label
                      onClick={(event) => removeBudget(event, b)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
