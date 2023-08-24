import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";


import Candle_comp from "../../components/charts/Candle_comp";

const fetchCrypto = (crypto, days) => {
  return axios.get(
    `https://api.coingecko.com/api/v3/coins/${crypto}/ohlc?vs_currency=eur&days=${days}`,
    {}
  );
};

export default function Candle() {
  const { value: crypto } = useSelector((state) => state.crypto.coin);
  const { value: days } = useSelector((state) => state.days.days);
  const descRef = useRef();

  const {
    isLoading: chartIsLoading,
    isError: chartIsError,
    error: chartError,
    data: chartData,
  } = useQuery(["crypto-coin", crypto, days], () => fetchCrypto(crypto, days), {
    staleTime: 60000,
    refetchInterval: 125000,
  });

  if (chartIsLoading) {
    return <p className="loading">Loading ...</p>;
  }

  if (chartIsError) {
    return (
      <p className="loading">
        Something went wrong: <br /> {chartError.message}
      </p>
    );
  }

  // console.log(chartData);
  const ohlcData = chartData?.data.map((b) => {
    return { timestamp: b[0], open: b[1], high: b[2], low: b[3], close: b[4] };
  });

  return (
    <>
      <div className="HeadChart">
        <h2 className="crypto">
          <FontAwesomeIcon icon={faCoins} /> {crypto}
        </h2>
        <button
          className="tips-btn"
          onClick={() => descRef.current.scrollIntoView({ behavior: "smooth" })}
        >
         Tips <FontAwesomeIcon icon={faAngleDown} />
        </button>
      </div>
      <div className="chart-container">
        <Candle_comp data={ohlcData} />
      </div>
      <article className="chart-description">
        <h2 ref={descRef}>Understanding Candlestick Charts</h2>
        <p>
          Candlestick charts might look complex, but they hold essential clues
          about price movements. Each candle shows how the price changed over a
          specific time. When a big candle follows a smaller one, and it is
          going up, this could mean prices might rise. On the other hand, if a
          big candle follows a smaller one and it is going down, it might signal
          prices could fall. If a candle looks like a plus sign ( + ) or a minus
          sign ( - ), it means the market is undecided and prices might change.
        </p>
        <h3>Tips for Candlestick Charts</h3>
        <p>
          1) Look for Patterns: Keep an eye out for patterns like engulfing (one
          candle covers the previous one), doji (a small body), or hammer (a
          small body with a long lower wick). These patterns could indicate
          potential price changes. <br /> 2) Observe Trends: When you see
          several green (or white) candles in a row, it could signal an upward
          trend. A series of red (or black) candles might suggest a downward
          trend. <br /> 3) Use Timeframes: Switch between different timeframes
          like 1-hour, 4-hour, or daily to see short-term and long-term trends.
          Longer timeframes can help you spot overall trends, while shorter ones
          show recent changes.
        </p>
      </article>
    </>
  );
}
