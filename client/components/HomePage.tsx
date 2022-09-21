import { useState, useEffect, MouseEvent } from 'react';
import ClusterChart from './ClusterChart';
import Events from './Events';
import Graph from './Graph';
import DetailsModal from './Modal';

import {
  ClusterChartProps,
  SvgInfo,
  ModalProps,
  ClusterAllInfo,
} from '../Types';
import { useNavigate } from 'react-router-dom';

const tempData: SvgInfo[] = [
  {
    name: 'string',
    usage: 1,
    resource: 'hello',
    request: 0.9,
    limit: Math.random() + 1,
    parent: 'string',
    namespace: 'string',
  },
];

const initalClusterChartData: ClusterAllInfo = {
  Clusters: tempData,
  Nodes: tempData,
  Pods: tempData,
  Deployments: tempData,
};

const HomePage = (props: any): JSX.Element => {
  const [pods, setPods]: any = useState([]);
  const [nodes, setNodes]: any = useState(['node1']);
  const [portOpen, setPortOpen]: any = useState(false);
  const [resource, setResource]: any = useState('');
  const [clusterChartData, setClusterChartData]: any = useState<ClusterAllInfo>(
    initalClusterChartData
  );
  const navigate = useNavigate();
  const { menuOpen, setMenuOpen } = props;

  // Ways to clean up the modal:
  // the modal is split into two states. the modalState could probably accept the JSX component as a key value
  const [modalState, setModalState] = useState(false);
  const [theModal, setTheModal] = useState(<p>No Modal Info</p>);

  const openModal = (e: MouseEvent, data: SvgInfo) => {
    console.log('Opening Modal');
    const position = {
      top: e.pageY.toString() + 'px',
      left: e.pageX.toString() + 'px',
    };
    const propData: ModalProps = {
      ...data,
      position: position,
      close: closeModal,
    };
    setTheModal(<DetailsModal {...propData} key={50} />);
    setModalState(true);
  };

  const closeModal = (): void => {
    setModalState(false);
  };

  const closeModalFromAnywhere = (e: MouseEvent): void => {
    if (e.target instanceof HTMLDivElement) setModalState(false);
  };

  const gke: ClusterChartProps = {
    ...clusterChartData,
    click: openModal,
    close: closeModal,
  };

  const renderData = async () => {
    const allTheInfo = await window.api.getAllInfo();
    console.log('this is all info', allTheInfo);

    if (resource === 'memory' || resource === 'cpu') {
      allTheInfo.Pods = allTheInfo.Pods.filter(
        (info: any) => info.resource === resource
      );
      setClusterChartData(allTheInfo);
    } else {
      setClusterChartData(allTheInfo);
    }
  };

  const handleResourceChange = (e: any) => {
    setResource(e.target.value);
  };

  useEffect(() => {
    renderData();
  }, [resource]);

  return (
    <div id="contents" onClick={closeModalFromAnywhere}>
      <div id={menuOpen ? 'left-side' : 'left-side-closed'}>
        <div id="cluster-chart">
          <div className="cluster-btns">
            <button
              className="select-mem"
              value="memory"
              onClick={handleResourceChange}
            >
              MEM
            </button>
            <button
              className="select-cpu"
              value="cpu"
              onClick={handleResourceChange}
            >
              CPU
            </button>
          </div>
          <ClusterChart
            Clusters={gke.Clusters}
            Nodes={gke.Nodes}
            Pods={gke.Pods}
            Deployments={gke.Deployments}
            click={gke.click}
            close={gke.close}
          />
        </div>
        <div id="graph">
          <Graph setResourceError={props.setResourceError} />
        </div>
      </div>
      <div id={menuOpen ? 'right-side' : 'right-side-closed'}>
        <Events
          analyzedPod={props.analyzedPod}
          setAnalyzedPod={props.setAnalyzedPod}
          setAnalyzedData={props.setAnalyzedData}
        />
      </div>
      {modalState && theModal}
    </div>
  );
};

export default HomePage;
