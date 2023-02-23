import InternalNavBar from '@/components/nav/internalNav'
import TransactionTable from '@/components/transactionTable'
import Head from 'next/head'
import { useSession } from 'next-auth/react';

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