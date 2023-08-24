import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import Sma_comp from "../../components/indicators/Sma_comp";

const fetchCrypto = (crypto, days) => {
  return axios.get(
    `https://api.coingecko.com/api/v3/coins/${crypto}/ohlc?vs_currency=eur&days=${days}`,
    {}
  );
};

export default function Sma() {
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
        <Sma_comp data={ohlcData} />
      </div>
      <article className="chart-description">
        <h2  ref={descRef} >Using Simple Moving Averages (SMA)</h2>
        <p>
          Imagine the SMA as a smooth line that helps you see the average price
          over time. When the actual price is higher than this line, it could
          suggest that prices might go up. If the price drops below the line, it
          might indicate prices could go down. A short line (like the 10-day
          average) reacts faster, but it can be jumpy. A longer line (like the
          50-day average) is steadier but reacts slower.
        </p>
        <h3>Tips for SMA</h3>
        <p>
          1) Watch Crossovers: When the actual price crosses above the SMA line,
          it might mean a potential rise in prices. If it crosses below, it
          could suggest a possible fall. <br/> 2) Confirm with Multiple SMAs: Using
          different SMA periods, like 10-day and 50-day, helps confirm trends.
          If the shorter SMA crosses above the longer one, it could indicate an
          upward trend.
        </p>
      </article>
    </>
  );
}
