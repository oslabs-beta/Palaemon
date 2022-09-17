import Graph from './Graph';

import { useState, useEffect } from 'react';
import ChartGrid from './ChartGrid';
import { AnalysisPageProps } from '../Types';
import LogCard from './LogCard';

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

    // const getPodOOMKillData = async() => {
    //   for (let i = 0; i < logsData.length; i++) {
    //     logCards.push(
    //       <LogCard
    //         key={i + 200}
    //         eventObj={logType === 'events' ? logsData[i] : undefined}
    //         alertObj={logType === 'alerts' ? logsData[i] : undefined}
    //         oomObj={logType === 'oomkills' ? logsData[i] : undefined}
    //         logType={logType}
    //         analyzedPod={analyzedPod}
    //         setAnalyzedPod={setAnalyzedPod}
    //       />
    //     );
    //   }
    // };

    renderOOMKills();

    console.log('ANALYZED POD CHANGED', analyzedPod);
  }, [analyzedPod]);

  return (
    <div id="analysis-container">
      <nav className="analysis-nav">
        <div className="analysis-nav-left">
          <select id="oomkill-selector">{OOMKillsList}</select>
          <select className="analysis-interval">
            <option>Interval</option>
          </select>
          <button className="analysis-delete-btn">Delete</button>
        </div>
        <div className="analysis-oomkill-data">
          {analyzedPod.podName ? (
            <>
              <div className="analysis-oomkill-data-left">
                <p>
                  <strong>Pod:</strong> {analyzedPod.podName}
                </p>
                <p>
                  <strong>Terminated At:</strong> {analyzedPod.started}
                </p>
              </div>
              <div className="analysis-oomkill-data-right">
                <p>
                  <strong>Restarted At:</strong> {analyzedPod.finished}
                </p>
                <p>
                  <strong>Restarts:</strong> {analyzedPod.restartcount}
                </p>
              </div>
            </>
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
