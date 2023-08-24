/* eslint-disable react/prop-types */
import ApexCharts from "react-apexcharts";

function Candle_comp({data}) {

  const ohlcData = data.map(({ timestamp, open, high, low, close }) => ({
    x: new Date(timestamp),
    y: [open, high, low, close],
  }));

  const series = [
    {
      data: ohlcData,
    },
  ];

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      width: 600,
    },
    title: {
      text: "Candlestick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="chart-background">
      <ApexCharts
        options={options}
        series={series}
        type="candlestick"
        height={600}
      />
    </div>
  );
}

export default Candle_comp;
