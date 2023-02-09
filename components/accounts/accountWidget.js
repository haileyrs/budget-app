import EditAccount from "./editAccountModal";

export default function AccountWidget({ name, value, updatedDate, plaid }) {
  return (
    <>
      <label htmlFor="edit-account-modal">
        <div className="stats shadow m-2">
          <div className="stat">
            <div className="stat-title">{name}</div>
            <div className="stat-value">${value}</div>
            <div className="stat-desc">Last Updated: {updatedDate}</div>
          </div>
        </div>
      </label>
      <EditAccount key={name} name={name} value={value} plaid={plaid}/>
    </>
  );
}
