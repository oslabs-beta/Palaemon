import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { GraphData, ChartGraphData, GraphableData } from '../Types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartGrid = (props: any) => {
  const initData: GraphData = [
    {
      Port9090isClosed: {
        times: ['a', 'b', 'c'],
        values: [1, 2, 3],
      },
    },
    {
      Port9090isClosedOpenIt: {
        times: ['a', 'b', 'c'],
        values: [3, 2, 1],
      },
    },
  ];

  const initData1: GraphData = [
    {
      TempPodInfo: {
        times: ['a', 'b', 'c'],
        values: [1, 2, 3],
      },
    },
    {
      OtherFakePods: {
        times: ['a', 'b', 'c'],
        values: [3, 2, 1],
      },
    },
  ];

  const [graphState, setGraphState] = useState<ChartGraphData>({
    nodeMem: initData,
    nodeCPU: initData1,
    podMem: initData,
    podCPU: initData,
  });

  const colorArray = [
    'red',
    'blue',
    'green',
    'black',
    'purple',
    'cyan',
    'yellow',
    'orange',
    '#003d33',
  ];

  const xLabels: string[] =
    graphState.nodeMem[0][Object.keys(graphState.nodeMem[0])[0]].times;

  let options: string = JSON.stringify({
    responsive: true,
    responsiveAnimationDuration: 1000,
    pointRadius: 0,
    indexAxis: 'x',
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'working title',
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgb(240, 240, 240)',
        },
        ticks: {
          color: '#797676',
        },
        title: {
          display: true,
          text: new Date().toDateString(),
        },
      },
      y: {
        grid: {
          color: 'rgb(240, 240, 240)',
        },
        ticks: {
          color: '#797676',
        },
        title: {
          display: true,
          text: 'Mibibytes',
        },
      },
    },
  });

  const multiOptions = {
    nodeMem: JSON.parse(options),
    nodeCPU: JSON.parse(options),
    podMem: JSON.parse(options),
    podCPU: JSON.parse(options),
  };

  const charts: JSX.Element[] = [];
  let datasetData = [] as GraphableData[];
  let keyCounter: number = 0;
  //   console.log('a');
  //   console.log('multiopt', multiOptions);

  // first we iterate of the total number of graphs we want
  (Object.keys(graphState) as (keyof typeof graphState)[]).forEach(
    (key, index) => {
      // console.log('whats this ', key, graphState[key], index);

      // then we iterate over all of the lines in that graph
      for (let i = 0; i < graphState[key].length; i++) {
        const podName: string = Object.keys(graphState[key][i])[0];
        datasetData.push({
          label: podName,
          backgroundColor: colorArray[i],
          borderColor: colorArray[i],
          data: graphState[key][i][podName].values,
        });
      }

      // this is part of the each individual graphs
      multiOptions[key].scales.y.title.text = 'y-axis label';
      multiOptions[key].plugins.title.text = key;
      charts.push(
        <div
          style={{
            position: 'relative',
            height: '40vh',
            width: '30vw',
          }}
          key={70 + keyCounter++}
        >
          <Line
            options={multiOptions[key]}
            data={{
              labels: xLabels,
              datasets: datasetData,
            }}
            key={70 + keyCounter++}
            width={300}
            height={300}
          />
        </div>
      );
      datasetData = [] as GraphableData[];
    }
  );

  return <>{charts}</>;
};

export default ChartGrid;
