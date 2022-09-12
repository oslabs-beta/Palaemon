import { GraphProps } from '../Types';
import { Line } from 'react-chartjs-2';

// I dont know why, but you need all this ChartJS stuff to make the react-chartjs-2 to work
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

const Graph = (props: GraphProps): JSX.Element => {

  const datasetData = [];
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

  const xLabels: string[] = props.data[0][Object.keys(props.data[0])[0]].times;

  for (let i = 0; i < props.data.length; i++) {
    const podName: string = Object.keys(props.data[i])[0];
    datasetData.push({
      label: podName,
      backgroundColor: colorArray[i],
      borderColor: colorArray[i],
      data: props.data[i][podName].values,
    });
  }

  const options: any = {
    responsive: true,
    pointRadius: 0,
    indexAxis: 'x',
    plugins: {
      legend: {
        // display: buttonClicked,
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Current Memory Usage by Pods'
      },
      // tooltip: {
      //   mode: 'label'
      // }
      // datalabels: {
      //   // hide datalabels for all datasets
      //   display: true,
      // },
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
          text: new Date().toDateString()
        }
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
          text: 'Mibibytes'
        }
      },
    },
  };


// console.log('chartjs', ChartJS.defaults.plugins.tooltip)
  const data = {
    labels: xLabels,
    datasets: datasetData,
  };
  // console.log('THIS IS final DATA OBJECT ', data)
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default Graph;
