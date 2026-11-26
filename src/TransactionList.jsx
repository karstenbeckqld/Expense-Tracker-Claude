import { useState } from 'react'
import { colorFor, formatDate, formatMoney } from './format'

const TYPE_FILTERS = [
  { value: "all", label: "All" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expenses" },
];

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  return (
    <section className="transactions" aria-labelledby="transactions-heading">
      <div className="transactions-header">
        <h2 id="transactions-heading">Transactions</h2>
        <div className="filters">
          <div className="chip-group" role="group" aria-label="Filter by type">
            {TYPE_FILTERS.map(f => (
              <button
                key={f.value}
                type="button"
                className="chip"
                aria-pressed={filterType === f.value}
                onClick={() => setFilterType(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <label className="category-filter">
            <span className="visually-hidden">Filter by category</span>
            {filterCategory !== "all" && (
              <span className="dot" style={{ background: colorFor(filterCategory) }} />
            )}
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">All categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="transactions-empty">
          No transactions match these filters.{" "}
          <button
            type="button"
            className="link-btn"
            onClick={() => { setFilterType("all"); setFilterCategory("all"); }}
          >
            Show all
          </button>
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col" className="num">Amount</th>
              <th scope="col"><span className="visually-hidden">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(t => {
              const sign = t.type === "income" ? "+" : "−";
              return (
                <tr key={t.id}>
                  <td className="cell-date">{formatDate(t.date)}</td>
                  <td className="cell-description">{t.description}</td>
                  <td className="cell-category">
                    <span className="dot" style={{ background: colorFor(t.category) }} />
                    {t.category}
                  </td>
                  <td className={`num ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                    {sign}{formatMoney(t.amount)}
                  </td>
                  <td className="cell-action">
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => {
                        if (window.confirm(`Delete "${t.description}" (${sign}${formatMoney(t.amount)})?`)) {
                          onDelete(t.id);
                        }
                      }}
                      aria-label={`Delete ${t.description}`}
                    >
                      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default TransactionList
