import InternalNavBar from '@/components/nav/internalNav';
import TransactionTable from '@/components/transactions/transactionTable';
import AddTransaction from '@/components/transactions/addTransactionModal';
import Head from 'next/head';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import plaid from '@/lib/plaid';
import prisma from '@/lib/prisma';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });
  console.log(user);
  const accounts = await prisma.moneyAccount.findMany({
    where: { userId: user.id }
  });
  const transactions = await prisma.transaction.findMany({
    where: { moneyAccountId: { in: accounts.map((e) => e.id) } },
    include: {
      category: {
        select: { name: true, id: true }
      },
      moneyAccount: {
        select: { name: true, id: true }
      }
    }
  });
  // const categories = await plaid.categoriesGet({});
  // console.log(categories.data.categories)

  const categories = await prisma.category.findMany();

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
    return (
      <>
        <Head>
          <title>Transactions</title>
        </Head>
        <InternalNavBar user={user}>
          <main>
            <div className="flex flex-row" id="title-div">
              <article className="prose">
                <h1>Transactions</h1>
              </article>
              <label
                htmlFor="add-transaction-modal"
                className="btn btn-sm gap-2 mx-2 mt-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add New
              </label>
            </div>
            <TransactionTable transactions={transactions} categories={categories} accounts={accounts} />
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