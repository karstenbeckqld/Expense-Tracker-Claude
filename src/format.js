// Shared presentation helpers: one color per category (used by the chart and the
// ledger dots) and a single currency format for every figure in the app.
export const CATEGORY_COLORS = {
  food: "#C98A2B",
  housing: "#3E5C8A",
  utilities: "#3D8C8C",
  transport: "#6B8E3E",
  entertainment: "#A8506E",
  salary: "#2F7A4F",
  other: "#7D6B9E",
};
const FALLBACK_COLOR = "#7A8580";
export const colorFor = (category) => CATEGORY_COLORS[category] || FALLBACK_COLOR;

export const formatCurrency = (value) =>
  `$${Number(value).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
