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
  let today = new Date();
  let y = today.getFullYear();
  let m = today.getMonth();

  let minDate = y + "-" + (m + 1) + '-01';
  let maxDate = (m === 11 ? y + 1 + '-01-01' : y + '-' + (m + 2) + '-01');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });
  const accounts = await prisma.moneyAccount.findMany({
    where: { userId: user.id }
  });
  let budgets = await prisma.budget.findMany({
    where: {
      AND: [{ userId: user.id }, { month: m }, { year: y }]
    },
    include: {
      category: {
        select: { name: true, id: true }
      }
    }
  });
  const transactions = await prisma.transaction.findMany({
    where: {
      AND: [{ moneyAccountId: { in: accounts.map((e) => e.id) }, date: { gte: new Date(minDate), lt: new Date(maxDate)} }]
    },
    include: {
      category: {
        select: { name: true, id: true }
      },
      moneyAccount: {
        select: { name: true, type: true }
      }
    }
  });

  transactions.sort((t, a) => new Date(a.date) - new Date(t.date));

  const recurringBudgets = await prisma.recurringBudget.findMany({
    where: { userId: user.id },
    include: {
      category: {
        select: { name: true, id: true }
      }
    }
  });

  if (recurringBudgets.length) {
    const catsWithBudget = budgets.map((b) => b.category.id);
    for (const b of recurringBudgets) {
      if (!catsWithBudget.includes(b.category.id)) {
        const newBudget = await prisma.budget.create({
          data: {
            userId: user.id,
            categoryId: b.category.id,
            max: b.max,
            value: 0,
            month: m,
            year: y
          }
        })
      }
    }
    budgets = await prisma.budget.findMany({
      where: {
        AND: [{ userId: user.id }, { month: m }, { year: y }]
      },
      include: {
        category: {
          select: { name: true, id: true }
        }
      }
    });
  };

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
    let monthSpend = 0;
    let monthChange = 0;
    let toSavings = 0;

    const today = new Date();
    const month = today.toLocaleString('default', { month: 'long' });
    monthRange = month + " 1 - Today"

    if (accounts) {
      accounts.forEach((a) => (netWorth += a.value));
      netWorth = parseInt(netWorth);
    }

    if (budgets.length) {
      let categories = budgets.map((b) => b.category.id);
      for (const t of transactions) {
        if (categories.includes(t.category.id)) {
          spent += t.amount * -1;
        }
      }
      budgets.map((b) => (max += b.max));
      budgetPercent = parseInt((spent / max) * 100);
      budgetLeft = parseInt(max - spent);
    };
    

    if (transactions.length) {
      transactions.forEach((t => {
        if (t.amount < 0) {
          monthSpend += t.amount * -1;
        };
        monthChange += t.amount
      }))
      
      if (monthChange > 0) {
        monthChange = '+' + monthChange;
      };

      transactions.map((e) => {
        if (e.moneyAccount.type === "Savings") {
          toSavings += e.amount
        }  
      });
    };

    return (
      <>
        <Head>
          <title>Summary</title>
        </Head>
        <InternalNavBar user={user}>
          <main>
            <div id="title-div">
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
                  <div className="stat-value">
                    ${netWorth.toLocaleString('en-US')}
                  </div>
                  <div className="stat-desc">Month Change: {monthChange}</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Monthly Spend</div>
                  <div className="stat-value">
                    ${monthSpend.toLocaleString('en-US')}
                  </div>
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
                    <div className="stat-value text-primary">
                      ${toSavings.toLocaleString('en-US')}
                    </div>
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
                  edit={false}
                />
              </div>
            </div>
          </main>
        </InternalNavBar>
      </>
    );
  }
}
