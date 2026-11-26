import { formatMoney } from './format'

function Summary({ totalIncome, totalExpenses, balance }) {
  const isOver = balance < 0;

  return (
    <section className="summary" aria-label="Summary">
      <p className="summary-headline">
        <span className={`balance-amount${isOver ? " is-negative" : ""}`}>{formatMoney(balance)}</span>{" "}
        {isOver ? "over" : "left"}
      </p>
      <p className="summary-detail">
        You earned <span className="income-amount">{formatMoney(totalIncome)}</span> and spent{" "}
        <span className="expense-amount">{formatMoney(totalExpenses)}</span>.
      </p>
    </section>
  );
}

export default Summary
