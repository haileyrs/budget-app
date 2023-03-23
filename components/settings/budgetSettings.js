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
      <div className="flex flex-col col-span-1">
        <article className="prose">
          <h2>Budgets</h2>
        </article>
        <div className="flex">
          <div className="grid grid-cols-1">
            <div>
              <p className="italic font-semibold text-primary">
                Add a recurring budget.
              </p>
            </div>
            <div className="flex flex-row">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="budget name"
                  className="input input-bordered input-primary"
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
            {budgets.map((c) => (
              <tr key={c.id}>
                <th>{c.name}</th>
                <td>placeholder</td>
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