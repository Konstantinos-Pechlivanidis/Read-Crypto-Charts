import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import Rsi_comp from "../../components/indicators/Rsi_comp";

const fetchCrypto = (crypto, days) => {
  return axios.get(
    `https://api.coingecko.com/api/v3/coins/${crypto}/ohlc?vs_currency=eur&days=${days}`,
    {}
  );
};

export default function Rsi() {
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
        <Rsi_comp data={ohlcData} />
      </div>
      <article className="chart-description">
        <h2 ref={descRef} >Understanding the Relative Strength Index (RSI)</h2>
        <p>
          The RSI is like a mood gauge for the market. If it shows a high number
          (above 70), it could mean prices went up too fast, and they might need
          to slow down or go down a bit. If it is a low number (below 30), it
          might mean prices dropped too quickly and could bounce back. When the
          RSI and the actual prices do not agree, like if RSI goes up but prices
          go down, it might show a change in direction.
        </p>
        <h3>Tips for RSI</h3>
        <p>
          1) Overbought & Oversold: When RSI goes above 70, it could mean prices
          went up too fast and might slow down. Below 30 could indicate prices
          dropped too quickly. <br/> 2) Look for Divergence: If RSI shows one thing and
          prices do the opposite, like RSI goes up but prices go down, it could
          imply a trend change.
        </p>
      </article>
    </>
  );
}
