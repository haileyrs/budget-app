import Modal from '../modalTemplate';
import Alert from '../alert';
import styles from './settings.module.css';
import Router from 'next/router';
import { useState } from 'react';

export default function EditCategory({ category, catNames }) {
  const [show, setShow] = useState(false);
  const timer = () => {
    const time = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => {
      clearTimeout(time);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (catNames.includes(event.target.name.value)) {
      console.log('that category name is taken');
    } else {
      try {
        const data = {
          categoryId: category.id,
          name: event.target.name.value
        };
        const response = await fetch(`/api/category`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await response.json();
        document.getElementById('edit-category' + category.id).click();
        await Router.push(
          {
            pathname: '/settings',
            query: {
              messageType: 'success',
              message: 'Category updated successfully'
            }
          },
          '/settings'
        );
      } catch (error) {
        setShow(true);
        timer();
      }
    } 
  };

  return (
    <>
      <Modal
        title={'Edit Category: ' + category.name}
        control={'edit-category' + category.id}
      >
        {show ? (
          <Alert
            alertType="error"
            message="Category could not be updated"
            handleClose={() => setShow(false)}
          />
        ) : (
          ''
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4">
            <div className="col-span-4 pb-2">
              <p className="whitespace-normal italic font-semibold text-primary">
                Changing a category name will update the transactions and
                budgets associated with that category
              </p>
            </div>
            <div className={styles.inputdiv}>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="new name"
                className="input input-bordered input-primary w-full max-w-xs"
                required
              />
            </div>
          </div>
          <div className="modal-action m-1">
            <button className="btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
