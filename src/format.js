// Shared display helpers.
export const CATEGORY_COLORS = {
  housing: "#8C7FF5",
  food: "#F2B544",
  utilities: "#3CC8CC",
  transport: "#F27A63",
  entertainment: "#E57AC8",
  salary: "#53C488",
  other: "#9AA1B0",
};

export const colorFor = (category) => CATEGORY_COLORS[category] || CATEGORY_COLORS.other;

export const formatMoney = (value) =>
  `$${Math.abs(value).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
