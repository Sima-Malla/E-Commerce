// const displayNPRCurrency = (num) => {
//   const formatter = new Intl.NumberFormat("ne-NP", {
//     style: "currency",
//     currency: "NPR",
//     minimumFractionDigits: 2,
//   });
//   return formatter.format(num);
// };
// export default displayNPRCurrency;

const displayNPRCurrency = (num) => {
  return `Rs ${Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
export default displayNPRCurrency;
