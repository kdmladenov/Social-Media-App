const numberDecimalFix = (number: number, decimals: number = 2) =>
  (Math.round(number * 100) / 100).toFixed(decimals);

export default numberDecimalFix;
