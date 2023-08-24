/* eslint-disable react/prop-types */
import ApexCharts from "react-apexcharts";
import { RSI_Indicator_Calc } from "../../indicator_calc/Rsi_Indicator_Calc";

import { useSelector } from "react-redux";

const Rsi_comp = ({ data }) => {
  const { value: period } = useSelector((state) => state.period.period);
  const { label } = useSelector((state) => state.period.period);

  const emaValue = RSI_Indicator_Calc(data, period);

  const options = {
    chart: {
      height: 350,
      type: "line",
    },
    title: {
      text: "EMA",
      align: "left",
    },
    stroke: {
      width: 1.5,
    },
    xaxis: {
      type: "datetime",
      style: {
        color: "#fff",
        background: "#775DD0",
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: (value) => {
          return value.toLocaleString();
        },
      },
    },
    series: [
      {
        name: "Candlestick",
        type: "candlestick",
        data: data.map((item) => ({
          x: new Date(item.timestamp),
          y: [item.open, item.high, item.low, item.close],
        })),
      },
    ],
  };

  const optionsRSI = {
    chart: {
      height: 350,
      type: "line",
    },
    title: {
      text: "RSI",
      align: "left",
    },
    xaxis: {
      type: "datetime",
      style: {
        color: "#fff",
        background: "#775DD0",
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: (value) => {
          return value.toLocaleString();
        },
      },
    },
    series: [
      {
        name: `RSI By Period (${label})`,
        type: "line",
        data: emaValue.map((item) => ({
          x: new Date(item.timestamp),
          y: item.rsi,
        })),
      },
    ],
  };


  return (
    <div className="chart-background">
      <ApexCharts
        options={options}
        series={options.series}
        type="candlestick"
        height={370}
      />

      <ApexCharts
        options={optionsRSI}
        series={optionsRSI.series}
        type="line"
        height={230}
      />
    </div>
  );
};
export default Rsi_comp;
