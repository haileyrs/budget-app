import InternalNavBar from '@/components/nav/internalNav';
import AccountWidget from '@/components/accounts/accountWidget';
import AddAccount from '@/components/accounts/addAccountModal';
import PlaidAddAccount from '@/components/accounts/plaidModal';
import Head from 'next/head';

export default function Accounts() {
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

          {/* for account in list of accounts */}
          {/* could possibly split into categories */}
          {/* <article className='prose pl-3'>
            <h2>Checking & Savings</h2>
          </article> */}
          <div className="account-group">
            <div className="divider">Checking & Savings</div>
            <AccountWidget
              name="US Bank Checking"
              value="36,000"
              updatedDate="1/23/2023"
            />
            <AccountWidget
              name="SOFI Savings"
              value="452,000"
              updatedDate="1/28/2023"
            />
          </div>
          <div className="account-group">
            <div className="divider">Investments</div>
            <AccountWidget
              name="Fidelity Retirement"
              value="14,000"
              updatedDate="2/6/2023"
            />
            <AccountWidget
              name="SOFI Robo Invest"
              value="10,548"
              updatedDate="2/5/2023"
            />
            <AccountWidget
              name="SOFI Self Managed Invest"
              value="12,458"
              updatedDate="2/5/2023"
            />
          </div>
          <div className="account-group">
            <div className="divider">Property</div>
            <AccountWidget
              name="2009 Toyota Camry"
              value="5,784"
              updatedDate="1/6/2023"
            />
          </div>
          <AddAccount />
          <PlaidAddAccount/>
        </main>
      </InternalNavBar>
    </>
  );
}
