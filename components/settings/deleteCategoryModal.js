import Modal from '../modalTemplate';
import ModalAlert from '../modalAlert';
import styles from './settings.module.css';
import Router from 'next/router';
import { useState } from 'react';

export default function DeleteCategory({ category, allCategories }) {
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
    const newCategory = allCategories.find(
      (e) => e.name == event.target.category.value
    );
    try {
      if (category.Budget.length) {
        for (const b of category.Budget) {
          const data = {
            id: b.id,
            categoryId: newCategory.id
          };
          const bResponse = await fetch(`/api/budget`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
        }
      }

      if (category.Transaction.length) {
        for (const t of category.Transaction) {
          const data = {
            transactionId: t.id,
            categoryId: newCategory.id
          };
          const tResponse = await fetch(`/api/transaction`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
        }
      }

      const response = await fetch(`/api/category`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId: category.id })
      });
      const result = await response.json();
      document.getElementById('delete-category' + category.id).click();
      await Router.push(
        ({
          pathname: '/settings',
          query: {
            messageType: 'success',
            message: 'Category deleted successfully'
          }
        },
        '/settings')
      );
    } catch (error) {
      console.log(error);
      setShow(true);
      timer();
    }
  };

  const removeAssoc = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/category`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId: category.id })
      });
      const result = await response.json();
      document.getElementById('delete-category' + category.id).click();
      await Router.push(
        ({
          pathname: '/settings',
          query: {
            messageType: 'success',
            message: 'Category deleted successfully'
          }
        },
        '/settings')
      );
    } catch (error) {
      console.log(error);
      setShow(true);
      timer();
    }
  };

  return (
    <>
      <Modal
        title={'Delete Category: ' + category.name}
        control={'delete-category' + category.id}
      >
        {show ? (
          <ModalAlert
            alertType="error"
            message="Category could not be deleted"
            handleClose={() => setShow(false)}
          />
        ) : (
          ''
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4">
            <div className="col-span-4 pb-2">
              <p className="whitespace-normal italic font-semibold text-primary">
                You are trying to delete a category that has transactions and
                budgets attached to it. Please select an existing category you
                would like to transfer these items to, or select 'Delete
                Associations'
              </p>
            </div>
            <div className={styles.inputdiv}>
              <select
                id="category"
                name="category"
                className="select select-primary w-full max-w-xs"
                defaultValue="category"
                required
              >
                <option disabled>category</option>
                {allCategories.map((c) => (
                  <option key={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-action m-1">
            <button className="btn btn-error" onClick={(e) => removeAssoc(e)}>
              Delete Associations
            </button>
            <button className="btn" type="submit">
              Move & Delete
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
