/* eslint-disable react/prop-types */
import ApexCharts from "react-apexcharts";
import {
  SMA_Indicator_Calc
} from "../../indicator_calc/SMA_Indicator_Calc";
import { useSelector } from "react-redux";

const Sma_comp = ({ data }) => {
  const { value: period } = useSelector((state) => state.period.period);
  const { label } = useSelector((state) => state.period.period);

  const smaValue = SMA_Indicator_Calc(data, period);

  // console.log(
  //   smaValue.map((item) => ({
  //     x: new Date(item.timestamp),
  //     y: item.average,
  //   }))
  // );

  const options = {
    chart: {
      height: 350,
      type: "line",
    },
    title: {
      text: "SMA",
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
      //   {
      //     name: "SMA",
      //     type: "line",
      //     data: data.map((item) => ({
      //       x: new Date(item.timestamp),
      //       y: smaValue,
      //     })),
      //   },
      {
        name: `SMA By Period (${label})`,
        type: "line",
        data: smaValue.map((item) => ({
          x: new Date(item.timestamp),
          y: item.average,
        })),
      },
    ],
    // Add other chart options here
    // ...
  };

  // const annotations = smaValue
  //   ? [
  //       {
  //         id: "sma-annotation",
  //         type: "line",
  //         x: 0,
  //         y: smaValue,
  //         x2: data.length - 1,
  //         y2: smaValue,
  //         strokeDashArray: 2,
  //         borderColor: "#775DD0",
  //         borderWidth: 2,
  //         label: {
  //           borderColor: "#775DD0",
  //           style: {
  //             fontSize: "12px",
  //             color: "#fff",
  //             background: "#775DD0",
  //           },
  //           text: "SMA",
  //         },
  //       },
  //     ]
  //   : [];

  return (
    <div className="chart-background">
      <ApexCharts
        options={options}
        series={options.series}
        // annotations={annotations}
        type="candlestick"
        height={600}
      />
    </div>
  );
};
export default Sma_comp;
