import InternalNavBar from '@/components/nav/internalNav';
import TransactionTable from '@/components/transactionTable';
import Head from 'next/head';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export async function getServerSideProps() {
  const accounts = await prisma.account.findMany({
    where: {
      userId: 1
    }
  });
  const budgets = await prisma.budget.findMany({
    where: {
      userId: 1
    }
  })
  const name = await prisma.user.findUnique({
    where: {
      id: 1
    }
  })
  return {
    props: {
      accounts,
      budgets,
      name
    }
  };
}

export default function Summary({ accounts, budgets, name }) {
  let netWorth = 0;
  let budgetPercent = 0;
  let budgetLeft = 0;
  let max = 0;
  let spent = 0;

  if (accounts) {
    accounts.forEach((a) => (netWorth += a.value));
    netWorth = parseInt(netWorth)
  };
  
  if (budgets) {
    budgets.forEach((b) => (max += b.max));
    budgets.forEach((b) => (spent += b.value));
    budgets.forEach((b) => (budgetLeft += (b.max - b.value)));
    budgetPercent = parseInt((spent / max)*100);
    budgetLeft = parseInt(budgetLeft);
  };


  return (
    <>
      <Head>
        <title>Summary</title>
      </Head>
      <InternalNavBar>
        <main>
          <div className="flex flex-row" id="title-div">
            <article className="prose">
              <h1>Welcome, {name.username}!</h1>
            </article>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="stats stats-vertical md:col-span-2 sm:stats-horizontal shadow">
              <div className="stat">
                <div className="stat-title">Net Worth</div>
                <div className="stat-value">${netWorth}</div>
                <div className="stat-desc">Month Change: +3.1K</div>
              </div>

              <div className="stat">
                <div className="stat-title">Monthly Spend</div>
                <div className="stat-value">${spent}</div>
                <div className="stat-desc">Jan 1 - Feb 1</div>
              </div>

              <div className="stat">
                <div className="stat-title">% of Budgets</div>
                <div className="stat-value">{budgetPercent}%</div>
                <div className="stat-desc">${budgetLeft} Left</div>
              </div>
            </div>
            <div className="pt-4 md:pt-0 md:pl-4">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Saved This Month</h2>
                  <p>$amount</p>
                  <div className="card-actions justify-end">
                    <Link href="/tabs/accounts/">
                      <label className="btn">Check It Out</label>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 md:col-span-3">
              <TransactionTable title="Recent Transactions" />
            </div>
          </div>
        </main>
      </InternalNavBar>
    </>
  );
}
