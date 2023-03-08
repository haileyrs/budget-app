import Link from 'next/link'

export default function TransactionTable({ title = 'Transactions', transactions, limit }) {
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
                </tr>
              ))}
              {/* <tr>
                <th>1/3/23</th>
                <td>Discover</td>
                <td>TARGET</td>
                <td>Groceries</td>
                <td>Your face</td>
              </tr>
              <tr>
                <th>1/3/23</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
                <td>blue</td>
              </tr>
              <tr>
                <th>1/6/23</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
                <td>polka dot</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}