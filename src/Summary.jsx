import { formatCurrency } from './format'

function Summary({ totalIncome, totalExpenses, balance }) {
  const overspent = balance < 0;
  const spentShare = totalIncome > 0 ? Math.min(totalExpenses / totalIncome, 1) : (totalExpenses > 0 ? 1 : 0);
  const spentPct = Math.round(spentShare * 100);

  return (
    <section className="summary" aria-labelledby="balance-heading">
      <h2 id="balance-heading" className="visually-hidden">Balance</h2>
      <p className={`summary-figure balance-amount${overspent ? " is-negative" : ""}`}>
        {overspent ? "−" : ""}{formatCurrency(Math.abs(balance))}
        <span className="summary-figure-unit">{overspent ? " over" : " left"}</span>
      </p>
      <p className="summary-sentence">
        You've spent <span className="expense-amount">{formatCurrency(totalExpenses)}</span> of{" "}
        <span className="income-amount">{formatCurrency(totalIncome)}</span> earned.
      </p>

      <div
        className="summary-strip"
        role="img"
        aria-label={`${spentPct}% of income spent`}
      >
        <span className="summary-strip-spent" style={{ width: `${spentShare * 100}%` }} />
      </div>
      <div className="summary-strip-legend">
        <span><i className="dot dot-spent" />Spent {spentPct}%</span>
        <span><i className="dot dot-kept" />Kept {Math.max(100 - spentPct, 0)}%</span>
      </div>
    </section>
  );
}

export default Summary
