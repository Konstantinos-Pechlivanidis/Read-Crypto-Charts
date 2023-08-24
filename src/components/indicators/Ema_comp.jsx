/* eslint-disable react/prop-types */
import ApexCharts from "react-apexcharts";
import { EMA_Indicator_Calc } from "../../indicator_calc/EMA_Indicator_Calc";

import { useSelector } from "react-redux";

const Ema_comp = ({ data }) => {

  const { value:period } = useSelector((state) => state.period.period);
  const { label } = useSelector((state) => state.period.period);

  const emaValue = EMA_Indicator_Calc(data,period);

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
      {
        name: `EMA By Period (${label})`,
        type: "line",
        data: emaValue.map((item) => ({
          x: new Date(item.timestamp),
          y: item.ema,
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
        height={600}
      />
    </div>
  );
};
export default Ema_comp;
