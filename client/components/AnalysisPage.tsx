import { useState, useEffect } from 'react';
import ChartGrid from './ChartGrid';
import { AnalysisPageProps, ChartGraphData } from '../Types';
import LogCard from './LogCard';
import Tooltip from './Tooltip';

const AnalysisPage = (props: AnalysisPageProps) => {
  // const [user, setUser] = useState<User | null>(null);

  const [OOMKillsList, setOOMKillsList] = useState<JSX.Element[] | null>([]);
  const [allOOMKills, setAllOOMKills] = useState<Promise<any>[]>([]);
  const [filteredLogs, setFilteredLogs]: any = useState([]);
  const [logType, setLogType]: any = useState<string>('events');
  const [tooltipState, setTooltipState]: any = useState(false);
  const [tooltip, setTooltip]: any = useState(<></>);
  const [hiddenInputs, setHiddenInputs]: any = useState([])
  const [loading, setLoading]: any = useState(false);
  const {
    analyzedPod,
    setAnalyzedPod,
    setAnalyzedData,
    analyzedData,
    showGraphs,
    setShowGraphs,
  }: any = props;

  const handleQuery = async (e: any) => {
    setLoading(true)
    let timeInterval = e.target["analysis-interval"].value + e.target['interval-unit'].value
    const podName = e.target['oomkill-selector'].value;
    if (podName === 'default') {
      setLoading(false)
      return
    }
    if (timeInterval === 'default' || !e.target["analysis-interval"].value) timeInterval = '5m'

    const nodeName = e.target[podName].value;
    const timeOfDeath = new Date(analyzedPod.started).toISOString();

    try {
      // analyzeData1 is object with all chart data. see type
      const analyzeData1: ChartGraphData = await window.api.getAnalysis(nodeName, timeInterval, timeOfDeath)

      props.setAnalyzedData(analyzeData1);
      setShowGraphs(true)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      return err
    }
  }

  // displays analyzed pod
  const updateAnalyzedPod = (e: any) => {
    // sets podName as node name. we deliver all pod data based on parent node, so we extract the pod's parent (node)
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
      const hiddenInps: any[] = []
      const oomkillData = await window.api.getOOMKills();
      const oomKillOptions: JSX.Element[] = oomkillData.map(
        (oomkill: any, i: number): JSX.Element => {
          hiddenInps.push(<input type='hidden' name={oomkill.podName} value={oomkill.node} key={i + 700}></input>)
          return (
            <option key={oomkill.podName + i} label={oomkill.podName} value={oomkill.podName} >
              {oomkill.podName}
            </option>
          );
        }
      );
      setOOMKillsList([...oomKillOptions]);
      setAllOOMKills([...oomkillData]);
      setHiddenInputs([...hiddenInps]);
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
            clusterChartData={props.clusterChartData}
            setAnalyzedData={setAnalyzedData}
            setShowGraphs={setShowGraphs}
          />
        );
      }
      setFilteredLogs([...logCards]);
    };

    // onChange, match the selected option pod with the pod in the allOOMKills then set analyzedPod to be that pod
    renderOOMKills();
    createLogs();

  }, [analyzedPod]);

  return (
    <div id="analysis-container">
      <nav className="analysis-nav">
        <div className="analysis-nav-left">
          {/* -------------------- START OF FORM -------------------- */}
          <form
            className="analysis-form"
            onSubmit={event => {
              event.preventDefault();
              handleQuery(event)
            }}
          >
            <select
              id="oomkill-selector"
              name="oomkill-selector"
              onChange={e => updateAnalyzedPod(e)}
            >
              <option value="default">Select OOMKilled Pod</option>
              {OOMKillsList}
            </select>
            {hiddenInputs}
            <input
              type='number'
              className="analysis-interval"
              name="analysis-interval"
              placeholder="Time"
            ></input>
            <select className="interval-unit" name="interval-unit">
              <option value="default">Select Unit</option>
              <option value="s">Seconds</option>
              <option value="m">Minutes</option>
              <option value="h">Hours</option>
            </select>
            <button className="query-btn">Query</button>
            <div className="tooltip-container">
              <svg
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
          </form>
          {/* -------------------- END OF FORM -------------------- */}
          {loading && (
            <div className='loading-bar'>
              <p id='loadname'>Loading  </p>
              <p className="loader"></p>
            </div>
          )}
        </div>
      </nav>
      <div className="analysis-main">
        {/* -------------------- START OF LEFT AREA -------------------- */}
        <div id="left-side">
          {/* -------------------- START OF OOM KILL DATA -------------------- */}
          <div className="analysis-oomkill-data">
            <span className="oomkilled-pod-data">OOMKilled Pod Data</span>
            {analyzedPod.podName ? (
              <div className="analysis-oomkill-data-container">
                <p className="analysis-oomkill-data-msg">
                  <strong>Pod:</strong> {analyzedPod.podName}
                </p>
                <p className="analysis-oomkill-data-msg">
                  <strong>Restarts:</strong> {analyzedPod.restartcount}
                </p>
                <p className="analysis-oomkill-data-msg">
                  <strong>Terminated at:</strong>{' '}
                  {analyzedPod.started.slice(0, -6)}
                </p>
                <p className="analysis-oomkill-data-msg">
                  <strong>Restarted at:</strong>{' '}
                  {analyzedPod.finished.slice(0, -6)}
                </p>
              </div>
            ) : (
              <p className="no-data-msg">Select OOMKilled Pod to Display Data</p>
            )}
          </div>
          {/* -------------------- END OF OOMKILL Data -------------------- */}

          <div className="filtered-log-container">
            <div className="filtered-events-heading">Events</div>
            <div className='filtered-events-container'>
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
        </div>
        {/* -------------------- CHART AREA -------------------- */}
        <div id="chartarea">
          <div className='chartarea-heading'>Metrics</div>
          {showGraphs ? (

            <div className='chartarea-container'>
              <ChartGrid analyzedData={analyzedData} />
            </div>
          ) : (
            <p className="no-data-msg graph-msg">
              Please Query an OOMKilled Pod to Display Charts
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
