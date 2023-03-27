import styles from './settings.module.css';
import ButtonLayout from '../addNewButtonLayout';

export default function BudgetSettings({ budgets = [] }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (categories.find((c) => event.target.name.value == c.name)) {
    //   catError = true;
    // } else {
    //   try {
    //     const data = {
    //       name: event.target.name.value
    //     };
    //     const response = await fetch(`/api/category`, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(data)
    //     });

    //     const result = await response.json();
    //     await Router.push('/settings');
        // document.getElementById('budgetForm').reset();
        // document.activeElement.blur();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };

  const removeCategory = async (id, e) => {
    e.preventDefault();
    // try {
    //   const response = await fetch(`/api/category`, {
    //     method: 'DELETE',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ categoryId: id })
    //   });
    //   const result = await response.json();
    //   await Router.push('/settings');
    // } catch (error) {
    //   console.log(error);
    // }
  };

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
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="budget name"
                      className="input input-bordered input-primary w-full my-1"
                      required
                    />
                    <input
                      type="number"
                      name="name"
                      id="name"
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
            {budgets.map((b) => (
              <tr key={b.id}>
                <th>{b.category.name}</th>
                <td>${b.max}</td>
                <td>
                  <label
                    onClick={(e) => removeCategory(c.id, e)}
                    className="btn btn-sm mr-2"
                  >
                    Edit
                  </label>
                  <label
                    onClick={(e) => removeCategory(c.id, e)}
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
    </>
  );
}
