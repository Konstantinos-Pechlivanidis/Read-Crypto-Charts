/* eslint-disable react/prop-types */
import ReactApexChart from "react-apexcharts";

function Line_comp({ data }) {
  const lineData = data.map(({ timestamp, price }) => [
    new Date(timestamp),
    price,
  ]);

  const series = [
    {
      data: lineData,
    },
  ];

  const options = {
    chart: {
      id: "chart2",
      type: "line",
      height: 300,
      width: 500,
      toolbar: {
        autoSelected: "pan",
        show: true,
      },
    },
    title: {
      text: "Line Chart",
      align: "left",
    },
    colors: ["#546E7A"],
    stroke: {
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      show: false,
      tickAmount: 5,
    },
  };

  const optionsLine = {
    chart: {
      id: "chart1",
      height: 150,
      type: "area",
      brush: {
        target: "chart2",
        enabled: true,
      },
      selection: {
        enabled: true,
      },
    },
    colors: ["#008FFB"],
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.91,
        opacityTo: 0.1,
      },
    },
    xaxis: {
      type: "datetime",
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      show: false,
      tickAmount: 2,
    },
  };

  return (
    <div className="chart-background">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={440}
      />
      <ReactApexChart
        options={optionsLine}
        series={series}
        type="area"
        height={200}
      />
    </div>
  );
}

export default Line_comp;
