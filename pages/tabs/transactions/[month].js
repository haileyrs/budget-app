import InternalNavBar from '@/components/nav/internalNav';
import TransactionTable from '@/components/transactions/transactionTable';
import AddTransaction from '@/components/transactions/addTransactionModal';
import ButtonLayout from '@/components/addNewButtonLayout';
import Head from 'next/head';
import Router from 'next/router';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';
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

  let pageMonth = parseInt(context?.params?.month);
  let today = new Date();
  let y = today.getFullYear();

  let minDate = y + '-' + (pageMonth + 1) + '-01';
  let maxDate =
    pageMonth === 11 ? y + 1 + '-01-01' : y + '-' + (pageMonth + 2) + '-01';

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
      accounts: accounts,
      pageMonth: pageMonth
    }
  };
}

export default function TransactionHistory({
  user,
  transactions,
  categories,
  accounts,
  pageMonth
}) {
  const { data: session, status } = useSession({ required: true });

  if (status == 'authenticated') {
    const goBack = (e) => {
      e.preventDefault();
      const month = pageMonth - 1;
      const year = 2023;
      // need to add year to url if possible to have two variables(year/month)
      // for now you only view transactions in this year
      Router.push('/tabs/transactions/[month]', `/tabs/transactions/${month}`);
    };

    const goForward = (e) => {
      e.preventDefault();
      const month = pageMonth + 1;
      const year = 2023;
      if (month === new Date().getMonth() && year === 2023) {
        Router.push('/tabs/transactions');
      } else {
        // need to add year to url if possible to have two variables(year/month)
        // for now you only view transactions in this year
        Router.push(
          '/tabs/transactions/[month]',
          `/tabs/transactions/${month}`
        );
      }
    };
    let lastMonth = false;
    if (pageMonth === 0) {
      lastMonth = true;
    }
    const date = new Date(pageMonth + 1 + '/1/2023');

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
                  disabled={lastMonth}
                  onClick={(e) => goBack(e)}
                  className="ml-2 btn btn-sm btn-circle"
                >
                  ❮
                </button>
                <button
                  onClick={(e) => goForward(e)}
                  className="mx-2 btn btn-sm btn-circle"
                >
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
