export const convertTime = (duration) => {
  return new Date(duration * 1000)
    .toLocaleString("en-US", { timeZone: "America/St_Johns" })
    .slice(10)
    .trim()
    .replace(",", "");
};
