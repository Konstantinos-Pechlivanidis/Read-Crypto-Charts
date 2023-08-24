export const RSI_Indicator_Calc = (data, period) => {
    if (data.length < period) {
      return [];
    }
  
    const rsiArray = [];
    const gains = [];
    const losses = [];
  
    // Calculate initial gains and losses
    for (let i = data.length - 1; i >= data.length - period; i--) {
      const { close } = data[i];
      const prevClose = data[i - 1].close;
  
      const change = close - prevClose;
  
      if (change >= 0) {
        gains.push(change);
        losses.push(0);
      } else {
        gains.push(0);
        losses.push(Math.abs(change));
      }
    }
  
    let avgGain = gains.reduce((acc, val) => acc + val, 0) / period;
    let avgLoss = losses.reduce((acc, val) => acc + val, 0) / period;
  
    let rs = avgGain / avgLoss;
    let rsi = 100 - (100 / (1 + rs));
  
    rsiArray.unshift({ timestamp: data[data.length - period].timestamp, rsi });
  
    // Calculate the rest of the RSI values
    for (let i = data.length - period - 1; i >= 0; i--) {
      const { close } = data[i];
      const prevClose = data[i + 1].close;
  
      const change = close - prevClose;
  
      let gain = 0;
      let loss = 0;
  
      if (change >= 0) {
        gain = change;
      } else {
        loss = Math.abs(change);
      }
  
      avgGain = ((avgGain * (period - 1)) + gain) / period;
      avgLoss = ((avgLoss * (period - 1)) + loss) / period;
  
      rs = avgGain / avgLoss;
      rsi = 100 - (100 / (1 + rs));
  
      rsiArray.unshift({ timestamp: data[i].timestamp, rsi });
    }
  
    return rsiArray;
  };
  