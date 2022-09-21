import { GraphData } from '../Types';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { ProgressPlugin } from 'webpack';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = (props: any): JSX.Element => {
  const [portOpen, setPortOpen] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [graphState, setGraphState] = useState<GraphData>([
    {
      Port9090isClosed: {
        times: ['a', 'b', 'c'],
        values: [1, 2, 3],
      },
    },
    {
      Port9090isClosed: {
        times: ['a', 'b', 'c'],
        values: [3, 2, 1],
      },
    },
  ]);

  const navigate = useNavigate();

  if (!portOpen)
    fetch('http://localhost:9090/').then(response => {
      // console.log('status code', response.status)
      if (response.status === 200) {
        console.log('Port 9090 is Open');
        setPortOpen(true);
      } else {
        //optional place to throw error when port 9090 is closed
      }
    });

  useEffect(() => {
    refreshGraphData();
  }, [portOpen]);

  const refreshGraphData = () => {
    if (portOpen) {
      window.api
        .getMemoryUsageByPods()
        .then((output: any) => {
          // console.log(output)
          if (output.length < 1) {
            // console.log("returning out without setGraphState");
            // props.setResourceError("No resources found in this namespace");
            return navigate('/');
          } else if (!output.err) setGraphState(output);
          // console.log('itworks')
        })
        .catch((err: any) => {
          return { err: err };
        });
      setTimeout(refreshGraphData, 5000);
    }
  };

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

  // let keyname: keyof typeof graphState[0] = Object.keys(graphState[0])[0]

  const xLabels: string[] = graphState[0][Object.keys(graphState[0])[0]].times;

  for (let i = 0; i < graphState.length; i++) {
    const podName: string = Object.keys(graphState[i])[0];
    datasetData.push({
      label: podName,
      backgroundColor: colorArray[i],
      borderColor: colorArray[i],
      data: graphState[i][podName].values,
    });
  }

  const options: any = {
    responsive: true,
    responsiveAnimationDuration: 1000,
    pointRadius: 0,
    indexAxis: 'x',
    plugins: {
      legend: {
        display: buttonClicked,
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Current Memory Usage by Pods',
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
          text: 'Megabytes',
        },
      },
    },
  };

  const handleLegendClick = () => {
    setButtonClicked(prevCheck => !prevCheck);
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
      <button className="legend-btn-main" onClick={handleLegendClick}>
        {!buttonClicked ? 'Show' : 'Hide'}
      </button>
    </>
  );
};

export default Graph;
