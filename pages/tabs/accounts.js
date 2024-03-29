import InternalNavBar from '@/components/nav/internalNav';
import AccountWidget from '@/components/accounts/accountWidget';
import AddAccount from '@/components/accounts/addAccountModal';
import PlaidAddAccount from '@/components/accounts/plaidModal';
import ButtonLayout from '@/components/addNewButtonLayout';
import Alert from '@/components/alert';
import Head from 'next/head';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
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

export default function Accounts({ accounts, user }) {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const timer = () => {
    const time = setTimeout(() => {
      setShow(false);
      setMessage('');
    }, 5000);
    return () => {
      clearTimeout(time);
    };
  };

  if (status == 'authenticated') {
    const checkingSavings = accounts.filter(
      (a) => a.type == 'Checking' || a.type == 'Savings'
    );
    const investments = accounts.filter(
      (a) => a.type == 'Investment' || a.type == 'Retirement'
    );
    const property = accounts.filter((a) => a.type == 'Property');
    const credit = accounts.filter((a) => a.type == 'Credit');
    const loans = accounts.filter((a) => a.type == 'Loan');

    if (router.query.message) {
      if (router.query.message != message) {
        setMessage(router.query.message);
        setAlertType(router.query.messageType);
        setShow(true);
        timer();
        router.replace('/tabs/accounts', undefined, { shallow: true });
      }
    };

    return (
      <>
        <Head>
          <title>Accounts</title>
        </Head>
        <InternalNavBar user={user}>
          <main>
            {show ? (
              <Alert
                message={message}
                alertType={alertType}
                handleClose={() => setShow(false)}
              />
            ) : (
              ''
            )}
            <div id="title-div">
              <article className="prose">
                <h1>Accounts</h1>
              </article>
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-sm gap-2 mx-2 mt-2">
                  <ButtonLayout />
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
            {accounts.length == 0 ? (
              <p>You have not added any accounts yet</p>
            ) : (
              ''
            )}
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
                  negative={true}
                />
              ))}
            </div>
            <div className="account-group">
              <div className="divider">Loans</div>
              {loans.map((account) => (
                <AccountWidget
                  key={account.id}
                  id={account.id}
                  type={account.type}
                  name={account.name}
                  amount={account.value}
                  updatedDate={account.lastUpdated}
                  negative={true}
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
