import InternalNavBar from '@/components/nav/internalNav';
import AccountWidget from '@/components/accounts/accountWidget';
import AddAccount from '@/components/accounts/addAccountModal';
import PlaidAddAccount from '@/components/accounts/plaidModal';
import Head from 'next/head';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });
  console.log(user);
  const accounts = await prisma.moneyAccount.findMany({
    where: { userId: user.id }
  });

  console.log(accounts)
  return {
    props: {
      accounts: accounts,
      user: user
    }
  };
}

export default function Accounts({ accounts, user }) {
  const { data: session, status } = useSession({ required: true });

  if (status == 'authenticated') {
    const checkingSavings = accounts.filter(
      (a) => a.type == 'Checking' || a.type == 'Savings'
    );
    const investments = accounts.filter(
      (a) => a.type == 'Investment' || a.type == 'Retirement'
    );
    const property = accounts.filter((a) => a.type == 'Property');
    const credit = accounts.filter((a) => a.type == 'Credit');
    
    return (
      <>
        <Head>
          <title>Accounts</title>
        </Head>
        <InternalNavBar>
          <main>
            <div className="flex flex-row" id="title-div">
              <article className="prose">
                <h1>Accounts</h1>
              </article>
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-sm gap-2 mx-2 mt-2">
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
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <label htmlFor="add-plaid-account-modal">
                    <li>
                      <a>Use Plaid</a>
                    </li>
                  </label>
    
                  <label htmlFor="add-account-modal">
                    <li>
                      <a className="justify-between">Add Manually</a>
                    </li>
                  </label>
                </ul>
              </div>
            </div>
            <div className="instructions">
              <p className="italic font-semibold text-primary">
                Click on an account card to update it.
              </p>
            </div>
    
            {/* <article className='prose pl-3'>
                <h2>Checking & Savings</h2>
              </article> */}
            <div className="account-group">
              <div className="divider">Checking & Savings</div>
              {checkingSavings.map((account) => (
                <AccountWidget
                  key={account.id}
                  id={account.id}
                  type={account.type}
                  name={account.name}
                  amount={account.value}
                  updatedDate={account.lastUpdated}
                />
              ))}
            </div>
            <div className="account-group">
              <div className="divider">Investments</div>
              {investments.map((account) => (
                <AccountWidget
                  key={account.id}
                  id={account.id}
                  type={account.type}
                  name={account.name}
                  amount={account.value}
                  updatedDate={account.lastUpdated}
                />
              ))}
            </div>
            <div className="account-group">
              <div className="divider">Property</div>
              {property.map((account) => (
                <AccountWidget
                  key={account.id}
                  id={account.id}
                  type={account.type}
                  name={account.name}
                  amount={account.value}
                  updatedDate={account.lastUpdated}
                />
              ))}
            </div>
            <div className="account-group">
              <div className="divider">Credit</div>
              {credit.map((account) => (
                <AccountWidget
                  key={account.id}
                  id={account.id}
                  type={account.type}
                  name={account.name}
                  amount={account.value}
                  updatedDate={account.lastUpdated}
                />
              ))}
            </div>
            <AddAccount user={user} />
            <PlaidAddAccount />
          </main>
        </InternalNavBar>
      </>
    );
  } 
}
