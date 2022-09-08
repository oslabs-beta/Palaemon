import * as React from "react";
// import { Chart } from "chart.js";
// import { Line } from "react-chartjs-2";

// import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = (): JSX.Element => {
  var ctx = document.getElementById("myChart") as HTMLCanvasElement;

  const options: any = {
    responsive: true,
    pointRadius: 0,
    indexAxis: "x",
    plugins: {
      legend: {
        // display: buttonClicked,
        position: "bottom" as const,
      },
      datalabels: {
        // hide datalabels for all datasets
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgb(240, 240, 240)",
        },
        ticks: {
          color: "#797676",
        },
      },
      y: {
        grid: {
          color: "rgb(240, 240, 240)",
        },
        ticks: {
          color: "#797676",
        },
      },
    },
  };
  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default Graph;
