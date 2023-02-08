import Modal from "../modalTemplate"
import Link from "next/link"

export default function LoginModal() {
  return (
    <>
      <Modal title="Login" control="login-modal">
        <div className="flex">
          <input
            type="text"
            placeholder="username"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="password"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div className="modal-action">
          <Link href="/tabs/summary/">
            <label className="btn">Log in</label>
          </Link>
        </div>
      </Modal>
    </>
  );
}