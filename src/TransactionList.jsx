import { useState } from 'react'
import { colorFor, formatCurrency, formatDate } from './format'

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
    <section className="panel transactions">
      <div className="transactions-head">
        <h2>Transactions</h2>
        <div className="filters">
          <select aria-label="Filter by type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select aria-label="Filter by category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="empty">No transactions match these filters. Change a filter or add a transaction.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col" className="col-amount">Amount</th>
              <th scope="col"><span className="visually-hidden">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(t => (
              <tr key={t.id}>
                <td className="col-date">{formatDate(t.date)}</td>
                <td className="col-description">{t.description}</td>
                <td className="col-category">
                  <span className="category-tag">
                    <i className="dot" style={{ background: colorFor(t.category) }} />
                    {t.category}
                  </span>
                </td>
                <td className={`col-amount ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                  {t.type === "income" ? "+" : "−"}{formatCurrency(t.amount)}
                </td>
                <td className="col-actions">
                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (window.confirm(`Delete "${t.description}" (${t.type === "income" ? "+" : "-"}$${t.amount})?`)) {
                        onDelete(t.id);
                      }
                    }}
                    aria-label={`Delete ${t.description}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default TransactionList
