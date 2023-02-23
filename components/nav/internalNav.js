import ProfileModal from '../user/profileModal';
import LogoutModal from '../user/logoutModal';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function InternalNavBar({ children }) {
  const router = useRouter();

  const activeClass = (path) => {
    let activeC = '';
    router.pathname == path
      ? (activeC = 'bg-primary')
      : (activeC = 'text-neutral-content');
    return activeC;
  };

  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="navbar bg-neutral text-neutral-content">
            <div className="flex-none">
              <label
                htmlFor="my-drawer"
                className="btn btn-ghost drawer-button lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1">
              <button className="btn btn-ghost normal-case text-xl">
                <Link href="/tabs/summary">Bad Title</Link>
              </button>
            </div>
            {/* theme switch */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-52"
              >
                <label htmlFor="profile-modal">
                  <li>
                    <a>Profile</a>
                  </li>
                </label>
                <li>
                  <Link href="/settings/">Settings</Link>
                </li>
                <label htmlFor="logout-modal">
                  <li>
                    <a>Logout</a>
                  </li>
                </label>
              </ul>
            </div>
          </div>
          <div>{children}</div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content bg-neutral">
            <li>
              <Link
                className={activeClass('/tabs/summary')}
                href="/tabs/summary/"
              >
                Summary
              </Link>
            </li>
            <li>
              <Link
                className={activeClass('/tabs/budgets')}
                href="/tabs/budgets/"
              >
                Budgets
              </Link>
            </li>
            <li>
              <Link
                className={activeClass('/tabs/transactions')}
                href="/tabs/transactions/"
              >
                Transactions
              </Link>
            </li>
            <li>
              <Link
                className={activeClass('/tabs/accounts')}
                href="/tabs/accounts/"
              >
                Accounts
              </Link>
            </li>
            <li>
              <Link
                className={activeClass('/tabs/export')}
                href="/tabs/export/"
              >
                Export
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <ProfileModal />
      <LogoutModal />
    </>
  );
}
