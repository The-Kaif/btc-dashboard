export const formatNumber = (value: string | number | undefined) => {
  if (!value) return "-";

  const num = Number(value);

  if (isNaN(num)) return "-";

  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};