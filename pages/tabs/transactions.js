import InternalNavBar from '@/components/nav/internalNav';
import TransactionTable from '@/components/transactions/transactionTable';
import AddTransaction from '@/components/transactions/addTransactionModal';
import ButtonLayout from '@/components/addNewButtonLayout';
import Head from 'next/head';
import Router from 'next/router';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });
  const accounts = await prisma.moneyAccount.findMany({
    where: { userId: user.id }
  });

  let today = new Date();
  let y = today.getFullYear();
  let m = today.getMonth();

  let minDate = y + '-' + (m + 1) + '-01';
  let maxDate = m === 11 ? y + 1 + '-01-01' : y + '-' + (m + 2) + '-01';
  
  const transactions = await prisma.transaction.findMany({
    where: {
      AND: [
        {
          moneyAccountId: { in: accounts.map((e) => e.id) },
          date: { gte: new Date(minDate), lt: new Date(maxDate) }
        }
      ]
    },
    include: {
      category: {
        select: { name: true, id: true }
      },
      moneyAccount: {
        select: { name: true, id: true }
      }
    }
  });

  const categories = await prisma.category.findMany({
    where: { userId: user.id }
  });
  transactions.sort((t, a) => new Date(a.date) - new Date(t.date));

  return {
    props: {
      user: user,
      transactions: transactions,
      categories: categories,
      accounts: accounts
    }
  };
}

export default function Transactions({ user, transactions, categories, accounts }) {
  const { data: session, status } = useSession({ required: true });

  if (status == 'authenticated') {
    const date = new Date();

    const getHistory = (e) => {
      e.preventDefault();
      const sendMonth = date.getMonth() - 1;
      Router.push('/tabs/transactions/[month]', `/tabs/transactions/${sendMonth}`);
    };
    
    return (
      <>
        <Head>
          <title>Transactions</title>
        </Head>
        <InternalNavBar user={user}>
          <main>
            <div className="justify-between" id="title-div">
              <div className="flex">
                <article className="prose">
                  <h1>Transactions</h1>
                </article>
                <label
                  htmlFor="add-transaction-modal"
                  className="btn btn-sm gap-2 mx-2 mt-2"
                >
                  <ButtonLayout />
                </label>
              </div>
              <div className="flex self-end place-items-end">
                <article className="prose">
                  <h3>
                    {date.toLocaleString('en-us', { month: 'long' })}, 2023
                  </h3>
                </article>
                <button
                  onClick={(e) => getHistory(e)}
                  className="ml-3 btn btn-sm btn-circle"
                >
                  ❮
                </button>
                <button disabled className="mx-2 btn btn-sm btn-circle">
                  ❯
                </button>
              </div>
            </div>
            <TransactionTable
              transactions={transactions}
              categories={categories}
              accounts={accounts}
            />
            <AddTransaction
              user={user}
              categories={categories}
              accounts={accounts}
            />
          </main>
        </InternalNavBar>
      </>
    );
  }
}