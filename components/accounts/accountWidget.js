import EditAccount from "./editAccountModal";

export default function AccountWidget({ id, type, name, amount, updatedDate, plaid }) {
  return (
    <>
      <label htmlFor={id}>
        <div className="stats shadow m-2">
          <div className="stat">
            <div className="stat-title">{name}</div>
            <div className="stat-value">${amount}</div>
            <div className="stat-desc">Last Updated: {updatedDate}</div>
          </div>
        </div>
      </label>
      <EditAccount key={id} id={id} type={type} name={name} amount={amount} plaid={plaid}/>
    </>
  );
}
