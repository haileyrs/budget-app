import Link from 'next/link'


export default function TransactionTable({ title = 'Transactions', transactions, limit }) {
  return (
    <>
      <div>
        <div className="overflow-x-auto">
          <article className='prose'>
            <h3>{title}</h3>
          </article>
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Account</th>
                <th>Vendor(?)</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1/3/23</th>
                <td>Discover</td>
                <td>TARGET</td>
                <td>Groceries</td>
              </tr>
              <tr>
                <th>1/3/23</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              <tr>
                <th>1/6/23</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}