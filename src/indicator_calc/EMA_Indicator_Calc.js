export const EMA_Indicator_Calc = (data, period) => {
  if (data.length === 0) {
    return [];
  }

  const smoothingFactor = 2 / (period + 1);
  const emaArray = [];
  let initialEMA = data[data.length - 1].close; // Start with the last closing price

  for (let i = data.length - 1; i >= 0; i--) {
    const { timestamp, close } = data[i];

    const ema = (close * smoothingFactor) + (initialEMA * (1 - smoothingFactor));

    const emaObject = {
      timestamp,
      ema
    };

    emaArray.unshift(emaObject); // Add the EMA object at the beginning of the array

    initialEMA = ema; // Set the current EMA as the initial EMA for the next iteration
  }

  return emaArray;
};
