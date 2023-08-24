import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import Ema_comp from "../../components/indicators/Ema_comp";

const fetchCrypto = (crypto, days) => {
  return axios.get(
    `https://api.coingecko.com/api/v3/coins/${crypto}/ohlc?vs_currency=eur&days=${days}`,
    {}
  );
};

export default function Ema() {
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
        <Ema_comp data={ohlcData} />
      </div>
      <article className="chart-description">
        <h2 ref={descRef} >Making Sense of Exponential Moving Averages (EMA)</h2>
        <p>
          Think of the EMA as a line that pays more attention to recent prices.
          If the actual price goes above this line, it might mean prices could
          rise. If it goes below, prices might fall. Because the EMA focuses
          more on what just happened, it might show changes sooner than the SMA.
          Trying different EMAs, like 12-day and 26-day, helps see short-term
          and long-term trends.
        </p>
        <h3>Tips for EMA</h3>
        <p>
          1) Focus on Crossovers: Similar to SMA, watch for when the actual
          price crosses above or below the EMA. It might signal a trend change.
          <br/> 2) Consider Shorter EMAs: Shorter EMA periods, like 9-day and 21-day,
          react quickly to price changes. They might help catch short-term
          trends.
        </p>
      </article>
    </>
  );
}
