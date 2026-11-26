import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// Fixed color per category so a category keeps its color when the bar order changes.
const CATEGORY_COLORS = {
  food: "#f59e0b",
  housing: "#6366f1",
  utilities: "#06b6d4",
  transport: "#10b981",
  entertainment: "#ec4899",
  salary: "#84cc16",
  other: "#8b5cf6",
};
const FALLBACK_COLOR = "#64748b";
const colorFor = (category) => CATEGORY_COLORS[category] || FALLBACK_COLOR;

const formatCurrency = (value) => `$${value.toLocaleString()}`;

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
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 24, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="#eee" />
            <XAxis dataKey="category" tick={{ fill: "#52514e", fontSize: 13 }} axisLine={{ stroke: "#ddd" }} tickLine={false} />
            <YAxis tickFormatter={formatCurrency} tick={{ fill: "#888", fontSize: 12 }} axisLine={false} tickLine={false} width={64} />
            <Tooltip content={<SpendingTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.04)" }} />
            <Bar
              dataKey="amount"
              maxBarSize={48}
              radius={[4, 4, 0, 0]}
              label={{ position: "top", formatter: formatCurrency, fill: "#52514e", fontSize: 12 }}
            >
              {data.map((entry) => (
                <Cell key={entry.category} fill={colorFor(entry.category)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart
