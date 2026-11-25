# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

This is the starter project for the "Claude Code" course on codewithmosh.com. It is a small React + Vite expense tracker that **intentionally contains a bug, poor UI, and messy code** — these are fixed progressively throughout the course. Don't assume messy code is accidental; check with the user before "cleaning up" something that may be a deliberate teaching artifact.

## Commands

```bash
npm install      # install dependencies
npm run dev       # start Vite dev server at http://localhost:5173
npm run build     # production build (outputs to dist/)
npm run preview   # preview the production build locally
npm run lint      # run ESLint over the project
```

There is no test suite/framework configured in this repo.

## Architecture

This is a single-page app with a flat component structure (all files directly in `src/`, no routing or external state management — everything is local `useState`):

- `src/main.jsx` — entry point; mounts `<App />` into `#root` inside `StrictMode`.
- `src/App.jsx` — parent component. Owns the `transactions` state and the `categories` array, computes the summary totals, and composes the three child components below.
- `src/Summary.jsx` — the three summary cards (Income/Expenses/Balance). Props: `totalIncome`, `totalExpenses`, `balance`. Stateless — totals are computed in `App` and passed down.
- `src/TransactionForm.jsx` — the add-transaction form. Props: `categories`, `onAdd`. Owns its own form-field state (`description`, `amount`, `type`, `category`); on submit it builds a new transaction object (with `Date.now()` as `id` and today's date), passes it to `onAdd`, and resets its fields.
- `src/TransactionList.jsx` — the filter dropdowns and transactions table. Props: `transactions`, `categories`. Owns its own filter state (`filterType`, `filterCategory`) and derives `filteredTransactions` from the `transactions` prop.
- `src/App.css` / `src/index.css` — plain CSS, no CSS modules or styling library. Class names like `income-amount`, `expense-amount`, and `balance-amount` are reused across the summary cards (in `Summary.jsx`) and the transactions table (in `TransactionList.jsx`) to color-code positive/negative values — keep that convention in mind when touching styles.

Key data flow:
- `transactions` (in `App`) is seeded with a hardcoded in-memory array — there is no backend or persistence layer, so a page refresh resets all data to the seed values. It is the only shared state; children receive it via props and add to it via the `onAdd` callback (`App.handleAdd`).
- `totalIncome`/`totalExpenses`/`balance` are derived in `App` via `.filter().reduce()` over `transactions` on every render (not memoized).
- The `categories` array in `App` is the single source of truth for category options; it is passed as a prop to both `TransactionForm` and `TransactionList`.
- Form state and filter state are local to their respective child components, so changing a filter or typing in the form only re-renders that component, not `App` or its siblings.
