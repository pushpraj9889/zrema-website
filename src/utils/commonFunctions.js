// calculateMrp.js
const calculateMrp = (mrp, discount) => {
  const finalPrice = mrp - (mrp * discount) / 100;
  return finalPrice;
};

export default calculateMrp;
