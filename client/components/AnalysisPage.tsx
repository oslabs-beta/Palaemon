import Graph from './Graph';

import { useState, useEffect } from 'react';
import ChartGrid from './ChartGrid';
import { AnalysisPageProps } from '../Types';
import LogCard from './LogCard';

const AnalysisPage = (props: AnalysisPageProps) => {
  const [OOMKillsList, setOOMKillsList]: any = useState([]);
  const [allOOMKills, setAllOOMKills]: any = useState([]);
  const { analyzedPod, setAnalyzedPod }: any = props;

  const updateAnalyzedPod = (e: any) => {
    const podName = e.target.value;
    const newAnalysis = allOOMKills.filter(
      (oomkill: any) => oomkill.podName === podName
    );
    console.log('new analysis', newAnalysis);
    setAnalyzedPod({ ...newAnalysis[0] });
    console.log('analyzedPod', analyzedPod);
  };

  useEffect(() => {
    const renderOOMKills = async () => {
      const data = await window.api.getOOMKills();
      const oomKillOptions: JSX.Element[] = data.map(
        (oomkill: any, i: number): JSX.Element => {
          return (
            <option key={oomkill.podName + i} value={oomkill.podName}>
              {oomkill.podName}
            </option>
          );
        }
      );
      setOOMKillsList([...oomKillOptions]);
      setAllOOMKills([...data]);
    };

    // onChange, match the selected option pod with the pod in the allOOMKills then set analyzedPod to be that pod
    renderOOMKills();

    console.log('ANALYZED POD CHANGED', analyzedPod);
  }, [analyzedPod]);

  return (
    <div id="analysis-container">
      <nav className="analysis-nav">
        <div className="analysis-nav-left">
          <select id="oomkill-selector" onChange={e => updateAnalyzedPod(e)}>
            <option value="default">Select OOMKill Error</option>
            {OOMKillsList}
          </select>
          <select className="analysis-interval">
            <option>Interval</option>
          </select>
          <button className="analysis-delete-btn">Delete</button>
        </div>
        <div className="analysis-oomkill-data">
          {analyzedPod.podName ? (
            <div className="analysis-oomkill-data-container">
              <div className="analysis-oomkill-data-left">
                <p>
                  <strong>Pod:</strong> {analyzedPod.podName}
                </p>
                <p>
                  <strong>Restarts:</strong> {analyzedPod.restartcount}
                </p>
              </div>
              <div className="analysis-oomkill-data-right">
                <p>
                  <strong>Terminated At:</strong> {analyzedPod.started}
                </p>
                <p>
                  <strong>Restarted At:</strong> {analyzedPod.finished}
                </p>
              </div>
            </div>
          ) : (
            <p className="select-oomkill-msg">
              Select an OOMKill error to analyze
            </p>
          )}
        </div>
      </nav>
      <div className="analysis-main">
        <div id="left-side">
          <div className="pod-overview">Pod overview</div>
          <div className="filtered-event-log">Filtered Event Log</div>
        </div>
        <div id="chartarea">
          <ChartGrid />
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
