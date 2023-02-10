import EditBudget from './editBudgetModal';
import styles from './budget.module.css';

export default function BudgetWidget({ id, name, value, max }) {
  const remaining = max - value;
  return (
    <>
      <div
        className="card card-normal card-bordered shadow-md"
        id="budget-card"
      >
        <div className="card-body">
          <div className={styles.topdiv}>
            <div className="flex prose">
              <h2>{name}</h2>
            </div>
            <div className="flex prose">
              <p>
                ${value} of ${max}
              </p>
            </div>
          </div>

          <progress
            className="progress progress-primary"
            value={value}
            max={max}
          ></progress>
          <div className={styles.topdiv}>
            <div className="flex prose">
              <p>${remaining} Left </p>
            </div>
            <div className='flex'>
              <label htmlFor={id} className="btn btn-sm btn-primary">Edit</label>
            </div>
          </div>
        </div>
      </div>
      <EditBudget key={id} id={id} name={name} amount={max}/>
    </>
  );
}
