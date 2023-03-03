import Modal from "../modalTemplate";
import Link from "next/link";
import { useSession, signOut } from 'next-auth/react';

export default function LogoutModal() {
  return (
    <>
      <Modal title="Logout" control="logout-modal">
        <div className="flex justify-center">
          <article className="prose">
            <h3>Are you sure you would like to logout?</h3>
          </article>
        </div>
        
        <div className="modal-action">
          <label htmlFor="logout-modal" className="btn">Cancel</label>
          
          <button className="btn" onClick={() => signOut({callbackUrl: 'http://localhost:3000/logout'})}>Log Out</button>
          
        </div>
      </Modal>
    </>
  );
}