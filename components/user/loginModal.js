import Modal from "../modalTemplate"
import Link from "next/link"
import { signIn } from 'next-auth/react';

export default function LoginModal() {
  return (
    <>
      <Modal title="Login" control="login-modal">
        <div className="grid grid-cols-2 justify-items-center">
          <div className="col-span-2 p-2">
            <input
              type="text"
              placeholder="username"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="col-span-2 p-2">
            <input
              type="text"
              placeholder="password"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
        </div>
        <div className="modal-action m-1">
          <Link href="/tabs/summary/">
            <button className="btn" onClick={() => signIn({undefined, callbackUrl: 'http://localhost:3000/tabs/summary'})}>Log in</button>
            <button className="btn">Log in</button>
          </Link>
        </div>
      </Modal>
    </>
  );
}