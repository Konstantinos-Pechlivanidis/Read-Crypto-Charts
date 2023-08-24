import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import Line_comp from "../../components/charts/Line_comp"

const fetchCrypto = (crypto, days) => {
  return axios.get(
    `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=eur&days=${days}`,
    {}
  );
};

export default function Line() {
  const { value: crypto } = useSelector((state) => state.crypto.coin);
  const { value: days } = useSelector((state) => state.days.days);

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

  const lineData = chartData?.data.prices.map((b) => {
    return { timestamp: b[0], price: b[1] };
  });

  return (
    <div className="chart-container">
      <Line_comp data={lineData} />
    </div>
  );
}