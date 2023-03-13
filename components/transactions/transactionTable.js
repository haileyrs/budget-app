import Link from 'next/link';
import EditTransaction from './editTransactionModal';

export default function TransactionTable({
  title = 'Transactions',
  transactions,
  limit,
  accounts = [],
  categories = []
}) {
  return (
    <>
      <div>
        <div className="overflow-x-auto">
          <article className="prose">
            <h3>{title}</h3>
          </article>
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Account</th>
                <th>Vendor</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {/* make a component that is a table row for easy editing */}
              {transactions.map((t) => (
                <tr key={t.id}>
                  <th>
                    {t.month}/{t.day}/{t.year}
                  </th>
                  <td>{t.category.name}</td>
                  <td>${t.amount}</td>
                  <td>{t.moneyAccount.name}</td>
                  <td>{t.vendor}</td>
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
                      month={t.month}
                      day={t.day}
                      year={t.year}
                      accounts={accounts}
                      categories={categories}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
