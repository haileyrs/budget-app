import EditAccount from "./editAccountModal";

export default function AccountWidget({ id, type, name, amount, updatedDate, plaid, negative = false }) {
  return (
    <>
      <label htmlFor={id}>
        <div className="stats shadow m-2">
          <div className="stat">
            <div className="stat-title">{name}</div>
            <div className="stat-value">
              {negative
                ? '-$' + (amount *= -1).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
                : '$' + amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
            <div className="stat-desc">Last Updated: {updatedDate}</div>
          </div>
        </div>
      </label>
      <EditAccount
        key={id}
        id={id}
        type={type}
        name={name}
        amount={amount}
        plaid={plaid}
      />
    </>
  );
}
