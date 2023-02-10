import Modal from "../modalTemplate";
import styles from "./budget.module.css";

export default function EditBudget({ id, name, amount }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        id: id,
        max: event.target.amount.value != '' ? parseFloat(event.target.amount.value) : amount
      };
      const response = await fetch(`/api/budget`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    // bleh
  };


  return (
    <>
      <Modal title="Edit Budget" control={id}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4">
            <div className={styles.inputdiv}>
              <select
                className="select select-primary w-full max-w-xs"
                disabled
              >
                <option>{name}</option>
              </select>
            </div>
            <div className={styles.dollar}>
              <p>$</p>
            </div>
            <div className={styles.inputdiv}>
              <input
                type="text"
                id="amount"
                name="amount"
                placeholder={amount}
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </div>
          </div>

          <div className="modal-action m-1">
            <button className="btn btn-error">Delete</button>
            <button className="btn" type="submit">Save</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
