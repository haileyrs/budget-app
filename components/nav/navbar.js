import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function NavBar({ children }) {
  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="w-full navbar bg-neutral text-neutral-content">
            <div className="navbar-start">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
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
                  <Link href="/">Bad Title</Link>
                </button>
              </div>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link href="/#about-section">About</Link>
                </li>
                <li>
                  <Link href="/#features-section">Features</Link>
                </li>
                <li>
                  <Link href="/#start-section">Get Started</Link>
                </li>
              </ul>
            </div>
            <div className="navbar-end">
              <button
                className="btn btn-primary btn-outline"
                onClick={() =>
                  signIn(undefined, {
                    callbackUrl: 'http://localhost:3000/tabs/summary'
                  })
                }
              >
                Log in
              </button>
              <button className="btn btn-primary ml-2">Sign Up</button>
            </div>
          </div>
          <div>{children}</div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-neutral-content bg-neutral">
            <li>
              <Link href="/#about-section">About</Link>
            </li>
            <li>
              <Link href="/#features-section">Features</Link>
            </li>
            <li>
              <Link href="/#start-section">Get Started</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
