import Link from 'next/link';
import EditTransaction from './editTransactionModal';

export default function TransactionTable({
  title = 'Transactions',
  transactions,
  edit = true,
  accounts = [],
  categories = []
}) {
  const toDate = (d) => {
    let date = new Date(d);
    let month = date.getMonth()+1
    let day = date.getDate();
    let year = date.getFullYear()
    return (month + '/' + day + '/' + year)
  };

  return (
    <>
      <div>
        <div className="overflow-x-auto">
          <article className="prose">
            <h3>{title}</h3>
          </article>
          {transactions.length === 0 ? (
            <p>No transactions to display.</p>
          ) : (
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Account</th>
                  <th>Vendor</th>
                  {edit ? <th>Options</th> : ''}
                </tr>
              </thead>
              <tbody>
                {/* make a component that is a table row for easy editing */}
                {transactions.map((t) => (
                  <tr key={t.id}>
                    <th>{toDate(t.date)}</th>
                    <td>{t.category.name}</td>
                    <td>{t.amount.toFixed(2)}</td>
                    <td>{t.moneyAccount.name}</td>
                    <td>{t.vendor}</td>
                    {edit ? (
                      <td>
                        <label htmlFor={t.id} className="btn btn-sm">
                          Edit
                        </label>
                        <EditTransaction
                          key={t.id}
                          id={t.id}
                          category={t.category}
                          amount={t.amount}
                          moneyAccount={t.moneyAccount}
                          vendor={t.vendor}
                          date={t.date}
                          accounts={accounts}
                          categories={categories}
                        />
                      </td>
                    ) : (
                      ''
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
