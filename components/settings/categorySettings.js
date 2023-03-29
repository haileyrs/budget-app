import styles from './settings.module.css';
import ButtonLayout from '../addNewButtonLayout';
import EditCategory from './editCategoryModal';
import DeleteCategory from './deleteCategoryModal';
import Router from 'next/router';

export default function CategorySettings({ categories = [], user}) {
  const categoryNames = categories.map((c) => c.name);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (categories.find((c) => event.target.name.value == c.name)) {
      // will probably move this
      await Router.push(
        {
          pathname: '/settings',
          query: {
            messageType: 'warning',
            message: 'A category with that name already exists'
          }
        },
        '/settings'
      );
    } else {
      try {
        const data = {
          name: event.target.name.value,
          userId: user.id
        };
        const response = await fetch(`/api/category`, {
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
              message: 'Category added successfully'
            }
          },
          '/settings'
        );
        document.getElementById('catForm').reset();
        document.activeElement.blur()
      } catch (error) {
        console.log(error);
        await Router.push(
          {
            pathname: '/settings',
            query: {
              messageType: 'error',
              message: 'There was an error adding your category'
            }
          },
          '/settings'
        );
      }
    }
  };

  const removeCategory = async (c, e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/category`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId: c.id })
      });
      const result = await response.json();
      await Router.push(
        {
          pathname: '/settings',
          query: {
            messageType: 'success',
            message: 'Category was successfully deleted'
          }
        },
        '/settings'
      );
    } catch (error) {
      console.log(error);
    }  
  };

  return (
    <>
      <div className={styles.container}>
        <article className="prose">
          <h2>Categories</h2>
        </article>
        <div id="catDropdown" className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-sm gap-2 mt-2">
            <ButtonLayout />
          </label>
          <div
            tabIndex={0}
            className="dropdown-content card card-bordered bg-base-100 p-2 w-80"
          >
            <div className="flex m-2">
              <div className="grid grid-cols-1">
                <p className="italic font-semibold text-primary">
                  Add a category
                </p>
                <div className="flex flex-row pt-1">
                  <form id="catForm" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="category name"
                      className="input input-bordered input-primary w-52"
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
              <th>Transactions</th>
              <th>Budgets</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <th>{c.name}</th>
                <td>{c.Transaction.length}</td>
                <td>{c.Budget.length}</td>
                <td>
                  <label
                    htmlFor={'edit-category' + c.id}
                    className="btn btn-sm mr-2"
                  >
                    Edit
                  </label>
                  <EditCategory category={c} catNames={categoryNames} />
                  {c.Transaction.length || c.Budget.length ? (
                    <label
                      htmlFor={'delete-category' + c.id}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </label>
                  ) : (
                    <label
                      onClick={(e) => removeCategory(c, e)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </label>
                  )}
                  <DeleteCategory category={c} allCategories={categories} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
