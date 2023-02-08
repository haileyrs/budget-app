import InternalNavBar from '@/components/nav/internalNav';
import TransactionTable from '@/components/transactionTable';
import Link from 'next/link';
import Head from 'next/head';

export default function Summary() {
  return (
    <>
      <Head>
        <title>Summary</title>
      </Head>
      <InternalNavBar>
        <main>
          <div className="flex flex-row" id="title-div">
            <article className="prose">
              <h1>Welcome, Name!</h1>
            </article>
          </div>
          <div className="grid grid-flow-col grid-cols-2">
            <div className="stats stats-vertical lg:stats-horizontal shadow">
              <div className="stat">
                <div className="stat-title">Net Worth</div>
                <div className="stat-value">$31,000</div>
                <div className="stat-desc">Month Change: +3.1K</div>
              </div>

              <div className="stat">
                <div className="stat-title">Monthly Spend</div>
                <div className="stat-value">$4,200</div>
                <div className="stat-desc">Jan 1 - Feb 1</div>
              </div>

              <div className="stat">
                <div className="stat-title">% of Budgets</div>
                <div className="stat-value">86%</div>
                <div className="stat-desc">$564 Left</div>
              </div>
            </div>

            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <p>Largest Spend Category</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
          <TransactionTable title="Recent Transactions" />
        </main>
      </InternalNavBar>
    </>
  );
}
