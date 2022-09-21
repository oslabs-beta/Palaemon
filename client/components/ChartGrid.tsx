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
import { watchPlugins } from '../../jest.config';

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
  const [buttonClicked, setButtonClicked] = useState({
    podMem: false,
    podCPU: false,
    nodeMem: false,
    nodeCPU: false,
    netRead: false,
    netWrite: false,
  });
  const { analyzedData } = props;
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

  const [graphState, setGraphState] = useState<ChartGraphData>({
    podCPU: initData,
    podMem: initData,
    nodeMem: initData,
    nodeCPU: initData,
    netRead: initData,
    netWrite: initData,
  });

  useEffect(() => {
    // set state with the data received from props object
    setGraphState(analyzedData);
  }, [props.analyzedData]);

  const colorArray: string[] = [
    'red',
    'blue',
    'green',
    'black',
    'purple',
    'cyan',
    'yellow',
    'orange',
  ];

  const xLabels: string[] =
    graphState.nodeMem[0][Object.keys(graphState.nodeMem[0])[0]].times;

  let options: string = JSON.stringify({
    responsive: true,
    responsiveAnimationDuration: 1000,
    maintainAspectRatio: false,
    pointRadius: 0,
    indexAxis: 'x',
    plugins: {
      legend: {
        display: false,
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
    netRead: JSON.parse(options),
    netWrite: JSON.parse(options),
  };

  const charts: JSX.Element[] = [];
  let datasetData = [] as GraphableData[];
  let keyCounter: number = 0;

  // handles open legend for specific graph instead of all of them
  const handleLegendClick = (keyName: 'podCPU' | 'podMem' | 'nodeMem' | 'nodeCPU' | 'netRead' | 'netWrite') => {
    const newButton = { ...buttonClicked }
    newButton[keyName] = !newButton[keyName]
    setButtonClicked(newButton);
  };

  // first we iterate of the total number of graphs we want
  (Object.keys(graphState) as (keyof typeof graphState)[]).forEach(
    (key) => {

      // then we iterate over all of the lines in that graph
      for (let i = 0; i < graphState[key].length; i++) {
        const podName: string = Object.keys(graphState[key][i])[0];
        if (!colorArray[i])
          colorArray.push(
            '#' + Math.floor(Math.random() * 16777215).toString(16)
          );
        datasetData.push({
          label: podName,
          backgroundColor: colorArray[i],
          borderColor: colorArray[i],
          data: graphState[key][i][podName].values,
        });
      }
      multiOptions[key].plugins.legend.display = buttonClicked[key];

      // this is part of the each individual graphs
      // multiOptions[key].scales.y.title.text = 'y-axis label';
      switch (key) {
        case 'nodeMem':
          multiOptions[key].scales.y.title.text = 'MegaBytes';
          multiOptions[key].plugins.title.text = 'Node Memory Usage';
          break;
        case 'nodeCPU':
          multiOptions[key].scales.y.title.text = 'Milicores';
          multiOptions[key].plugins.title.text = 'Node CPU Usage';
          break;
        case 'podMem':
          multiOptions[key].scales.y.title.text = 'MegaBytes';
          multiOptions[key].plugins.title.text = 'Pod Memory Usage';
          break;
        case 'podCPU':
          multiOptions[key].scales.y.title.text = 'Milicores';
          multiOptions[key].plugins.title.text = 'Pod CPU Usage';
          break;
        case 'netRead':
          multiOptions[key].scales.y.title.text = 'KiloBytes';
          multiOptions[key].plugins.title.text = 'Network Read';
          break;
        case 'netWrite':
          multiOptions[key].scales.y.title.text = 'KiloBytes';
          multiOptions[key].plugins.title.text = 'Network Write';
          break;
        default:
          console.log('Default Case Hit');
          break;
      }

      charts.push(
        <div
          className="line-chart-div"
          key={70 + keyCounter++}
        >
          <Line
            options={multiOptions[key]}
            data={{
              labels: xLabels,
              datasets: datasetData,
            }}
            key={70 + keyCounter++}
          />
          <button className="legend-btn-grid" onClick={() => handleLegendClick(key)}>
            {!buttonClicked[key] ? 'Show Legend' : 'Hide Legend'}
          </button>
        </div>
      );
      datasetData = [] as GraphableData[];
    }
  );

  return <>{charts}</>;
};

export default ChartGrid;
