import LoginModal from "../user/loginModal"


export default function NavBar() {
  return (
    <>
      <header className="navbar bg-neutral text-neutral-content">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>About</a></li>
              <li tabIndex={0}><a className="justify-between">Parent</a></li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Bad Title</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>About</a></li>
            <li tabIndex={0}><a>Parent</a></li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          <label htmlFor="login-modal" className="btn">Log In</label>
        </div>
        <LoginModal/>
      </header>
    </>
  )
}