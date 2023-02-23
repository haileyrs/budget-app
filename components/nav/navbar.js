import LoginModal from '../user/loginModal';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function NavBar() {
  return (
    <>
      <header className="navbar bg-neutral text-neutral-content">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-neutral rounded-box w-52"
            >
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
          <button className="btn btn-ghost normal-case text-xl">
            <Link href="/">Bad Title</Link>
          </button>
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
          <a 
            href={'/api/auth/signin'} 
            onClick={(e) => {
              e.preventDefault() 
              signIn()
            }}
          >
            Sign in

          </a>
          <label htmlFor="login-modal" className="btn btn-primary btn-outline">
            Log In
          </label>
          <button className="btn btn-primary ml-2">Sign Up</button>
        </div>
        <LoginModal />
      </header>
    </>
  );
}