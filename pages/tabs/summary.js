import InternalNavBar from '@/components/nav/internalNav';
import TransactionTable from '@/components/transactions/transactionTable';
import Head from 'next/head';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session)
  let today = new Date();
  let y = today.getFullYear();
  let m = today.getMonth() + 1;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });
  const accounts = await prisma.moneyAccount.findMany({
    where: { userId: user.id }
  });
  const budgets = await prisma.budget.findMany({
    where: {
      AND: [{ userId: user.id }, { month: m }, { year: y }]
    }
  });
  const transactions = await prisma.transaction.findMany({
    where: {
      AND: [{ moneyAccountId: { in: accounts.map((e) => e.id) } }, { month: m }, { year: y }]
    },
    include: {
      category: {
        select: { name: true }
      },
      moneyAccount: {
        select: { name: true }
      }
    }
  });

  return {
    props: {
      user: user,
      accounts: accounts,
      budgets: budgets,
      transactions: transactions
    }
  };
}

export default function Summary({ user, accounts, budgets, transactions }) {
  const { data: session, status } = useSession({ required: true });

  if (status == 'authenticated') {
    let netWorth = 0;
    let budgetPercent = 0;
    let budgetLeft = 0;
    let max = 0;
    let spent = 0;
    let monthRange = "";

    const today = new Date();
    const month = today.toLocaleString('default', { month: 'long' });
    monthRange = month + " 1 - Today"

    if (accounts) {
      accounts.forEach((a) => (netWorth += a.value));
      netWorth = parseInt(netWorth);
    }

    if (budgets.length) {
      budgets.forEach((b) => (max += b.max));
      budgets.forEach((b) => (spent += b.value));
      budgets.forEach((b) => (budgetLeft += b.max - b.value));
      budgetPercent = parseInt((spent / max) * 100);
      budgetLeft = parseInt(budgetLeft);
    }

    return (
      <>
        <Head>
          <title>Summary</title>
        </Head>
        <InternalNavBar user={user}>
          <main>
            <div className="flex flex-row" id="title-div">
              <article className="prose">
                <h1>
                  Welcome, {user.displayName ? user.displayName : user.name}!
                </h1>
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
                  <div className="stat-value">${spent.toFixed(2)}</div>
                  <div className="stat-desc">{monthRange}</div>
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
                    <p>${budgetLeft}</p>
                    <div className="card-actions justify-end">
                      <Link href="/tabs/accounts/">
                        <label className="btn">Check It Out</label>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 md:col-span-3">
                <TransactionTable
                  title="Transactions This Month"
                  transactions={transactions}
                />
              </div>
            </div>
          </main>
        </InternalNavBar>
      </>
    );
  }
}
