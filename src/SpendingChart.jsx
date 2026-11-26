import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { colorFor, formatCurrency } from './format';

function SpendingTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { category, amount } = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <span className="chart-tooltip-swatch" style={{ background: colorFor(category) }} />
      <span className="chart-tooltip-label">{category}</span>
      <span className="chart-tooltip-value">{formatCurrency(amount)}</span>
    </div>
  );
}

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

  return (
    <section className="panel spending-chart">
      <h2>Spending by category</h2>
      {data.length === 0 ? (
        <p className="empty">No expenses yet. Add one to see where your money goes.</p>
      ) : (
        // Horizontal bars: category names stay readable in a narrow rail.
        <ResponsiveContainer width="100%" height={data.length * 40 + 8}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 64, bottom: 0, left: 0 }} barCategoryGap={10}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="category"
              width={96}
              tick={{ fill: "#5E6E68", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<SpendingTooltip />} cursor={{ fill: "rgba(19, 48, 42, 0.05)" }} />
            <Bar
              dataKey="amount"
              radius={[0, 3, 3, 0]}
              label={{ position: "right", formatter: formatCurrency, fill: "#13302A", fontSize: 13 }}
            >
              {data.map((entry) => (
                <Cell key={entry.category} fill={colorFor(entry.category)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}

export default SpendingChart
