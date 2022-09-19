import Graph from './Graph';

import { useState, useEffect } from 'react';
import ChartGrid from './ChartGrid';
import { AnalysisPageProps } from '../Types';
import LogCard from './LogCard';
import { filter } from '../../webpack.config';

const AnalysisPage = (props: AnalysisPageProps) => {
  const [OOMKillsList, setOOMKillsList]: any = useState([]);
  const [allOOMKills, setAllOOMKills]: any = useState([]);
  const [podOverviewData, setPodOverviewData]: any = useState([]);
  const [filteredLogs, setFilteredLogs]: any = useState([]);
  const [logType, setLogType]: any = useState<string>('events');
  const { analyzedPod, setAnalyzedPod }: any = props;

  const updateAnalyzedPod = (e: any) => {
    const podName = e.target.value;
    const newAnalysis = allOOMKills.filter(
      (oomkill: any) => oomkill.podName === podName
    );
    setAnalyzedPod({ ...newAnalysis[0] });
  };

  useEffect(() => {
    // Queries for all OOMKilled pods and stores in state variables
    // 1) oomKillOptions - array of pod names used for drop down list
    // 2) allOomKills - array of oomkilled objects
    const renderOOMKills = async () => {
      const oomkillData = await window.api.getOOMKills();
      const oomKillOptions: JSX.Element[] = oomkillData.map(
        (oomkill: any, i: number): JSX.Element => {
          return (
            <option key={oomkill.podName + i} value={oomkill.podName}>
              {oomkill.podName}
            </option>
          );
        }
      );
      setOOMKillsList([...oomKillOptions]);
      setAllOOMKills([...oomkillData]);
    };

    // Queries and generates filtered logs of events for pod being analyzed
    const createLogs = async () => {
      const logCards: JSX.Element[] = [];
      const logsData = await window.api.getEvents();
      const filtered = logsData.filter(
        (log: any) => log.object.slice(4) === analyzedPod.podName
      );
      for (let i = 0; i < filtered.length; i++) {
        logCards.push(
          <LogCard
            key={i + 200}
            eventObj={logType === 'events' ? filtered[i] : undefined}
            alertObj={logType === 'alerts' ? filtered[i] : undefined}
            oomObj={logType === 'oomkills' ? filtered[i] : undefined}
            logType={logType}
            analyzedPod={analyzedPod}
            setAnalyzedPod={setAnalyzedPod}
          />
        );
      }
      setFilteredLogs([...logCards]);
    };

    // onChange, match the selected option pod with the pod in the allOOMKills then set analyzedPod to be that pod
    renderOOMKills();
    createLogs();

    console.log('ANALYZED POD CHANGED', analyzedPod);
  }, [analyzedPod]);

  return (
    <div id="analysis-container">
      <nav className="analysis-nav">
        <div className="analysis-nav-left">
          <select id="oomkill-selector" onChange={e => updateAnalyzedPod(e)}>
            <option value="default">Select OOMKilled Pod</option>
            {OOMKillsList}
          </select>
          <input
            className="analysis-interval"
            placeholder="Input Time Interval"
          ></input>
          <select className="interval-unit">
            <option value="default">Select Unit</option>
            <option value="s">Seconds</option>
            <option value="m">Minutes</option>
            <option value="h">Hours</option>
          </select>
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
            <p className="no-data-msg">Select OOMKilled Pod to Display Data</p>
          )}
        </div>
      </nav>
      <div className="analysis-main">
        <div id="left-side">
          <div className="pod-overview">
            {analyzedPod.podName && podOverviewData.length > 0 ? (
              podOverviewData
            ) : analyzedPod.podName ? (
              <p className="no-data-msg">No Data to Display</p>
            ) : (
              <p className="no-data-msg">
                Select OOMKilled Pod to Display Data
              </p>
            )}
          </div>
          <div className="filtered-log-container">
            {analyzedPod.podName && filteredLogs.length > 0 ? (
              filteredLogs
            ) : analyzedPod.podName ? (
              <p className="no-data-msg">No Events to Display</p>
            ) : (
              <p className="no-data-msg">
                Select OOMKilled Pod to Display Data
              </p>
            )}
          </div>
        </div>
        <div id="chartarea">
          <ChartGrid />
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
