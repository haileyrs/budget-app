import Modal from "../modalTemplate"
import Link from "next/link"

export default function LoginModal() {

  async function addUser(params) {
    const email = 'opal@gmail.com'
    const username = 'opal'
    const password = 'password1'
    try {
      const body = { email, username, password };
      await fetch(`/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    } catch (error) {
      console.log(error);
    }
  };

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
            {/* <label className="btn" onClick={() => addUser()}>Log in</label> */}
            <label className="btn">Log in</label>
          </Link>
        </div>
      </Modal>
    </>
  );
}