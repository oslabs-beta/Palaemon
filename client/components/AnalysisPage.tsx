import Graph from './Graph';

import { useState, useEffect } from 'react';
import ChartGrid from './ChartGrid';
import { AnalysisPageProps } from '../Types';

const AnalysisPage = (props: AnalysisPageProps) => {
  const [OOMKillsList, setOOMKillsList]: any = useState([]);
  const { analyzedPod, setAnalyzedPod }: any = props;

  useEffect(() => {
    const renderOOMKills = async () => {
      const data = await window.api.getOOMKills();
      const oomKillOptions: JSX.Element[] = data.map(
        (oomkill: any): JSX.Element => {
          return <option value="">{oomkill.podName}</option>;
        }
      );
      setOOMKillsList([...oomKillOptions]);
    };
    renderOOMKills();

    console.log('ANALYZED POD CHANGED', analyzedPod);
  }, [analyzedPod]);

  return (
    <div id="analysis-container">
      <nav className="analysis-nav">
        <div className="analysis-nav-left">
          <select id="oomkill-selector">{OOMKillsList}</select>
          <select>
            <option>Interval</option>
          </select>
          <button>Delete</button>
        </div>
        <div className="analysis-oomkill-data">
          podName, restartCount, started, finished
        </div>
      </nav>
      <div id="left-side">
        <div className="pod-overview">Pod overview</div>
        <div className="filtered-event-log">Filtered Event Log</div>
      </div>
      <div id="chartarea">
        <ChartGrid />
      </div>
    </div>
  );
};

export default AnalysisPage;
