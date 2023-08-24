// export const SMA_Indicator_Calc = ( priceData,timePeriod) => {
//   if (priceData.length < timePeriod) {
//     return []; // Not enough data to calculate SMA
//   }

//   const closingPrices = priceData.map(item => item.close);
//   const smaValues = [];

//   for (let i = 0; i <= priceData.length - timePeriod; i += timePeriod) {
//     const subset = closingPrices.slice(i, i + timePeriod);
//     const sum = subset.reduce((acc, val) => acc + val, 0);
//     const average = sum / timePeriod;
//     const timestamp = priceData[i].timestamp;
//     smaValues.push({ timestamp, average });
//   }

//   return smaValues;
// //   The slice() method to extract a window of price data for each SMA calculation. 
// //   Then, it applies the reduce() method to sum the values within that window. 
// //   The average is computed by dividing the sum by the time period, and the resulting 
// //   SMA is added to the smaValues array.
// };

  export const SMA_Indicator_Calc = (priceData, timePeriod) => {
    if (priceData.length < timePeriod) {
      return []; // Not enough data to calculate SMA
    }
  
    const closingPrices = priceData.map(item => item.close);
    const smaValues = [];
  
    // Start the iteration from the last available data point
    for (let i = priceData.length - 1; i >= timePeriod - 1; i--) {
      const subset = closingPrices.slice(i - timePeriod + 1, i + 1); // Extract the window in reverse order
      const sum = subset.reduce((acc, val) => acc + val, 0);
      const average = sum / timePeriod;
      const timestamp = priceData[i].timestamp;
      smaValues.unshift({ timestamp, average }); // Add the SMA value at the beginning of the array
    }
  
    return smaValues;
  };
  
  
  