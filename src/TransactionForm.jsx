import { useState } from 'react'

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedDescription = description.trim();
    const parsedAmount = Number(amount);
    if (!trimmedDescription || !Number.isFinite(parsedAmount) || parsedAmount <= 0) return;

    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    onAdd({
      id: Date.now(),
      description: trimmedDescription,
      amount: parsedAmount,
      type,
      category,
      date: today,
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <section className="add-transaction" aria-labelledby="add-heading">
      <h2 id="add-heading">Add a transaction</h2>
      <form onSubmit={handleSubmit}>
        <label className="field field-description">
          <span className="field-label">Description</span>
          <input
            type="text"
            placeholder="e.g. Coffee"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="field field-amount">
          <span className="field-label">Amount</span>
          <span className="amount-input">
            <span aria-hidden="true">$</span>
            <input
              type="number"
              inputMode="decimal"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </span>
        </label>
        <fieldset className="field segmented">
          <legend className="field-label">Type</legend>
          {["expense", "income"].map(option => (
            <label key={option} className="segmented-option">
              <input
                type="radio"
                name="type"
                value={option}
                checked={type === option}
                onChange={(e) => setType(e.target.value)}
              />
              <span>{option === "expense" ? "Expense" : "Income"}</span>
            </label>
          ))}
        </fieldset>
        <label className="field field-category">
          <span className="field-label">Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="primary-btn">Add</button>
      </form>
    </section>
  );
}

export default TransactionForm
