import { useState } from 'react'

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <section className="panel add-transaction">
      <h2>Add a transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="type-toggle" role="radiogroup" aria-label="Type">
          {["expense", "income"].map(option => (
            <label key={option} className={`type-option type-${option}${type === option ? " is-active" : ""}`}>
              <input
                type="radio"
                name="type"
                value={option}
                checked={type === option}
                onChange={(e) => setType(e.target.value)}
              />
              {option === "expense" ? "Expense" : "Income"}
            </label>
          ))}
        </div>

        <label className="field">
          <span className="field-label">Description</span>
          <input
            type="text"
            placeholder="e.g. Weekly groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="field-row">
          <label className="field">
            <span className="field-label">Amount</span>
            <span className="amount-input">
              <span aria-hidden="true">$</span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </span>
          </label>
          <label className="field">
            <span className="field-label">Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit" className="btn-primary">
          Add {type === "income" ? "income" : "expense"}
        </button>
      </form>
    </section>
  );
}

export default TransactionForm
