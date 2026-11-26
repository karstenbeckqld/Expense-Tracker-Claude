import { colorFor, formatMoney } from './format'

function SpendingChart({ transactions }) {
  const totals = {};
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });

  const data = Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  const total = data.reduce((sum, d) => sum + d.amount, 0);

  return (
    <section className="spending" aria-labelledby="spending-heading">
      <h2 id="spending-heading" className="visually-hidden">Spending by category</h2>
      {data.length === 0 ? (
        <p className="spending-empty">Add an expense to see where your money goes.</p>
      ) : (
        <>
          <div className="spending-bar" aria-hidden="true">
            {data.map((d, i) => (
              <span
                key={d.category}
                className="spending-segment"
                title={`${d.category}: ${formatMoney(d.amount)}`}
                style={{
                  flexGrow: d.amount,
                  background: colorFor(d.category),
                  animationDelay: `${i * 60}ms`,
                }}
              />
            ))}
          </div>
          <ul className="spending-legend">
            {data.map(d => (
              <li key={d.category}>
                <span className="dot" style={{ background: colorFor(d.category) }} />
                <span className="spending-legend-name">{d.category}</span>
                <span className="spending-legend-amount">{formatMoney(d.amount)}</span>
                <span className="spending-legend-share">{Math.round((d.amount / total) * 100)}%</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default SpendingChart
