import InternalNavBar from '@/components/nav/internalNav'
import TransactionTable from '@/components/transactionTable'
import Head from 'next/head'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });
  console.log(user);
  const transactions = await prisma.transaction.findMany();

  console.log(transactions);
  return {
    props: {
      transactions: transactions
    }
  };
}

export default function Transactions() {
  const { data: session, status } = useSession({ required: true });

  if (status == 'authenticated') {
    return (
      <>
        <Head>
          <title>Transactions</title>
        </Head>
        <InternalNavBar>
          <main>
            <div className="flex flex-row" id="title-div">
              <article className="prose">
                <h1>Transactions</h1>
              </article>
            </div>
            <TransactionTable/>
          </main>
        </InternalNavBar>
      </>
    )
  }
}