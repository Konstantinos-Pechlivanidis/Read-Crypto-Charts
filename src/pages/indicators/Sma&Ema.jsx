import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import Sma_Ema_comp from "../../components/indicators/Sma&Ema_comp";

const fetchCrypto = (crypto, days) => {
  return axios.get(
    `https://api.coingecko.com/api/v3/coins/${crypto}/ohlc?vs_currency=eur&days=${days}`,
    {}
  );
};

export default function Sma_Ema() {
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
        <Sma_Ema_comp data={ohlcData} />
      </div>
      <article className="chart-description">
        <h2 ref={descRef} >Combining EMA & SMA for Insight</h2>
        <p>
          Combining the EMA and SMA helps you see both short and long-term
          trends. When the shorter EMA crosses above the longer SMA, it could
          suggest that it is a good time to consider buying. If the shorter EMA
          crosses below the longer SMA, it might indicate that it is a moment to
          think about selling. This mix helps catch changes faster than the SMA
          alone.
        </p>
        <h3>Tips for Combined EMA & SMA</h3>
        <p>
          1) Look for Agreement: When both EMA and SMA suggest a similar trend
          (like both pointing upwards), it might indicate a strong trend. <br/> 2) Be
          Cautious with Contradiction: If EMA suggests an uptrend, but SMA
          suggests a downtrend, be careful. The market might be uncertain.
        </p>
      </article>
    </>
  );
}
