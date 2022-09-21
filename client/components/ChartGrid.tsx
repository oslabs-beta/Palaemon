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
  const [buttonClicked, setButtonClicked] = useState(false);
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
    podMem: initData,
    podCPU: initData,
    nodeMem: initData,
    nodeCPU: initData,
    netRead: initData,
    netWrite: initData,
  });

  useEffect(() => {
    // console.log("THIS IS PROPS DATA ", props.analyzedData);
    // console.log("useeffect on [], before the set", graphState);
    setGraphState(analyzedData);
    // console.log("after it gets set", graphState);
  }, [props.analyzedData]);

  const colorArray: string[] = [
    // 'red',
    // 'blue',
    // 'green',
    // 'black',
    // 'purple',
    // 'cyan',
    // 'yellow',
    // 'orange',
    // '#003d33',
  ];

  // console.log("before a crash", graphState);

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
        display: buttonClicked,
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
  //   console.log('a');
  //   console.log('multiopt', multiOptions);

  const handleLegendClick = () => {
    setButtonClicked(prevCheck => !prevCheck);
  };

  // first we iterate of the total number of graphs we want
  (Object.keys(graphState) as (keyof typeof graphState)[]).forEach(
    (key, index) => {
      // console.log("whats this ", key, graphState[key], index);

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

      // this is part of the each individual graphs
      // multiOptions[key].scales.y.title.text = 'y-axis label';
      switch (key) {
        case 'nodeMem':
          multiOptions[key].scales.y.title.text = 'MibiBytes';
          multiOptions[key].plugins.title.text = 'Node Memory Usage';
          break;
        case 'nodeCPU':
          multiOptions[key].scales.y.title.text = 'Milicores';
          multiOptions[key].plugins.title.text = 'Node CPU Usage';
          break;
        case 'podMem':
          multiOptions[key].scales.y.title.text = 'MibiBytes';
          multiOptions[key].plugins.title.text = 'Pod Memory Usage';
          break;
        case 'podCPU':
          multiOptions[key].scales.y.title.text = 'Milicores';
          multiOptions[key].plugins.title.text = 'Pod CPU Usage';
          console.log('podcpu is broekn?',graphState[key])
          break;
        case 'netRead':
          multiOptions[key].scales.y.title.text = 'KibiBytes';
          multiOptions[key].plugins.title.text = 'Network Read';
          break;
        case 'netWrite':
          multiOptions[key].scales.y.title.text = 'KibiBytes';
          multiOptions[key].plugins.title.text = 'Network Write';
          break;
        default:
          console.log('Default Case Hit');
          break;
      }
      // multiOptions[key].plugins.title.text = key;
      charts.push(
        <div
          className="line-chart-div"
          // style={{ height: '30rem', width: '30rem', margin: '2rem' }}
          key={70 + keyCounter++}
        >
          <Line
            options={multiOptions[key]}
            data={{
              labels: xLabels,
              datasets: datasetData,
            }}
            key={70 + keyCounter++}
            // width={'300px'}
            // height={'300px'}
          />
          <button className="legend-btn-grid" onClick={handleLegendClick}>
            {!buttonClicked ? 'Show Pods' : 'Hide Pods'}
          </button>
        </div>
      );
      datasetData = [] as GraphableData[];
    }
  );

  return <>{charts}</>;
};

export default ChartGrid;
