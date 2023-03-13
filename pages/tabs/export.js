import InternalNavBar from '@/components/nav/internalNav';
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
  const accounts = await prisma.moneyAccount.findMany({
    where: { userId: user.id }
  });

  return {
    props: {
      accounts: accounts,
      user: user
    }
  };
}

export default function Export({ accounts, user }) {
  const { data: session, status } = useSession({ required: true });

  if (status == 'authenticated') {
    return (
      <>
        <Head>
          <title>Export</title>
        </Head>
        <InternalNavBar user={user}>
          <main>
            <div className="flex flex-row" id="title-div">
              <article className="prose">
                <h1>Export</h1>
              </article>
            </div>
            <div className="space-x-4">
              <select
                className="select select-primary w-full max-w-xs"
                defaultValue="select your output"
              >
                <option disabled>select your output</option>
                <option>CSV File</option>
                <option>Sankey Diagram Format</option>
              </select>
              <button className="btn">GO</button>
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <article className="prose">
                  <h2>Filters</h2>
                </article>
              </div>
              <div className="flex space-x-4">
                <p>Date Range</p>
                <div className="form-control">
                  <div className="input-group">
                    <button className="btn btn-square">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      placeholder="Date"
                      className="input input-bordered"
                    />
                  </div>
                </div>
                <p>TO</p>
                <div className="form-control">
                  <div className="input-group">
                    <button className="btn btn-square">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      placeholder="Date"
                      className="input input-bordered"
                    />
                  </div>
                </div>
              </div>
              <p>Accounts</p>
              <div className="form-control">
                {accounts.map((a) => (
                  <label className="label cursor-pointer">
                    <span className="label-text">{a.name}</span>
                    <input type="checkbox" checked className="checkbox" />
                  </label>
                ))}
              </div>
            </div>
          </main>
        </InternalNavBar>
      </>
    );
  }

  
}