import Modal from "../modalTemplate";
import styles from "./account.module.css";

export default function PlaidAddAccount() {
  return (
    <>
      <Modal title="Add Account" control="add-plaid-account-modal">
        <div className="grid grid-cols-4">
          <div className={styles.inputdiv}>
            <p>This doesn't work yet</p>
          </div>
        </div>
      </Modal>
    </>
  )
}