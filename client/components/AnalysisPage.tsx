import Graph from './Graph';

import { useState, useEffect } from 'react';
import ChartGrid from './ChartGrid';
import { AnalysisPageProps } from '../Types';
import LogCard from './LogCard';
import { filter } from '../../webpack.config';
import DetailsModal from './Modal';
import Tooltip from './Tooltip';

const AnalysisPage = (props: AnalysisPageProps) => {
  const [OOMKillsList, setOOMKillsList]: any = useState([]);
  const [allOOMKills, setAllOOMKills]: any = useState([]);
  const [podOverviewData, setPodOverviewData]: any = useState([]);
  const [filteredLogs, setFilteredLogs]: any = useState([]);
  const [logType, setLogType]: any = useState<string>('events');
  const { analyzedPod, setAnalyzedPod }: any = props;
  const [tooltipState, setTooltipState]: any = useState(false);
  const [tooltip, setTooltip]: any = useState(<></>);

  const updateAnalyzedPod = (e: any) => {
    const podName = e.target.value;
    const newAnalysis = allOOMKills.filter(
      (oomkill: any) => oomkill.podName === podName
    );
    setAnalyzedPod({ ...newAnalysis[0] });
  };

  const openTooltip = (e: any) => {
    const position = {
      top: e.pageY.toString() + 'px',
      left: e.pageX.toString() + 'px',
    };
    setTooltip(<Tooltip position={position} />);
    setTooltipState(true);
  };

  const closeTooltip = () => {
    setTooltipState(false);
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
          <input className="analysis-interval" placeholder="Time"></input>
          <select className="interval-unit">
            <option value="default">Select Unit</option>
            <option value="s">Seconds</option>
            <option value="m">Minutes</option>
            <option value="h">Hours</option>
          </select>
          <button className="query-btn">Query</button>
          <div className="tooltip-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#00695c"
              className="bi bi-question-circle-fill tooltip"
              viewBox="0 0 16 16"
              onMouseEnter={openTooltip}
              onMouseLeave={closeTooltip}
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
            </svg>
            {tooltipState ? tooltip : null}
          </div>
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
                  <strong>Terminated at:</strong>{' '}
                  {analyzedPod.started.slice(0, -6)}
                </p>
                <p>
                  <strong>Restarted at:</strong>{' '}
                  {analyzedPod.finished.slice(0, -6)}
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
