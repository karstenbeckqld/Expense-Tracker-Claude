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

This is a single-page app with almost no file structure to speak of:

- `src/main.jsx` — entry point; mounts `<App />` into `#root` inside `StrictMode`.
- `src/App.jsx` — the entire application. All state, derived calculations, event handlers, and JSX for the summary cards, the add-transaction form, and the filterable transactions table live in this one component. There is no component decomposition, routing, or external state management — everything is local `useState`.
- `src/App.css` / `src/index.css` — plain CSS, no CSS modules or styling library. Class names like `income-amount`, `expense-amount`, and `balance-amount` are reused across both the summary cards and the transactions table to color-code positive/negative values — keep that convention in mind when touching styles.

Key data flow inside `App.jsx`:
- `transactions` is seeded with a hardcoded in-memory array (`useState`) — there is no backend or persistence layer, so a page refresh resets all data to the seed values.
- `totalIncome`/`totalExpenses`/`balance` are derived via `.filter().reduce()` over `transactions` on every render (not memoized).
- `filteredTransactions` is derived by chaining `filterType`/`filterCategory` filters over `transactions`.
- The `categories` array is the single source of truth for category options in both the add-transaction form and the category filter dropdown.
- `handleSubmit` appends a new transaction (with `Date.now()` as `id` and today's date) to `transactions` and resets the form fields.
