// calculateMrp.js
const calculateMrp = (mrp, discount) => {
  const finalPrice = Math.round(mrp - mrp * (discount / 100));
  return finalPrice;
};

export default calculateMrp;
