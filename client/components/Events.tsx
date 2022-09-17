import { useState, useEffect, EffectCallback, useInsertionEffect } from 'react';
import LogCard from './LogCard';
import { EventProps, EventObject } from '../Types';
import { filter } from '../../webpack.config';
import { capitalize } from '../../electron/utils';

const Events = (props: EventProps): JSX.Element => {
  const [logs, setLogs]: any = useState([]);
  const [logType, setLogType]: any = useState<string>('events');
  const [severityType, setSeverityType]: any = useState<string>('Default');
  const [loading, setLoading]: any = useState(true);
  const [analyzeLength, setAnalyzeLength]: any = useState(0);

  // const addToAnalyze = (logsData: any) => {
  //   props.handleAnalyzeUpdate(logsData);
  //   // props.getShoppingCartLength()
  //   setAnalyzeLength(props.getAnalyzeLength());
  //   // consol
  // };

  const handleLogTypeChange = (e: any) => {
    const logTypeStr = e.target.value;
    setLogType(logTypeStr);
    console.log(
      'handleLogTypeChange is working and current logType state is ',
      logType,
      ' and e.target.value is ',
      e.target.value
    );
  };

  const handleSeverityChange = (e: any) => {
    const severity = capitalize(e.target.value);
    setSeverityType(severity);
  };

  useEffect(() => {
    // populate and set logCards according to what type of logs is requested.
    // this is a helper function as typescript was not playing nicely with useEffect as an async function
    // window.api.getPods();
    const createLogs = async () => {
      const oomkills: any = await window.api.getOOMKills();

      const logCards: JSX.Element[] = [];
      let logsData;
      if (logType === 'events') {
        // events is an object with prop "formatttedEvents", which is an array of objects
        // each obj in array has the following keys: namespace, lastSeen, severity, reason, message, object
        logsData = await window.api.getEvents();
      } else if (logType === 'alerts') {
        logsData = await window.api.getAlerts();
      } else if (logType === 'oomkills') {
        logsData = await window.api.getOOMKills();
      }

      for (let i = 0; i < logsData.length; i++) {
        logCards.push(
          <LogCard
            key={i + 200}
            eventObj={logType === 'events' ? logsData[i] : undefined}
            alertObj={logType === 'alerts' ? logsData[i] : undefined}
            oomObj={logType === 'oomkills' ? logsData[i] : undefined}
            logType={logType}
            handleAnalyzeUpdate={props.handleAnalyzeUpdate}
            // addToAnalyze={addToAnalyze}
          />
        );
      }

      if (logCards.length > 0) {
        setLoading(false);
      }

      if (severityType !== 'Default') {
        const filteredLogs = logCards.filter((log: any) => {
          if (
            logType === 'events' &&
            log.props.eventObj.severity === severityType
          )
            return log;
          else if (
            logType === 'alerts' &&
            log.props.alertObj.severity === severityType
          )
            return log;
        });
        setLogs(filteredLogs);
      } else setLogs(logCards);
    };

    createLogs();
  }, [logType, severityType]);

  // useEffect(() => {
  //   console.log('changed');
  //   console.log('length', props.analyze.length);
  //   setAnalyzeLength(props.analyze.length);
  // }, [props.analyze]);

  return (
    <div id="container-event" className="container events right-side">
      <nav id="container-select" className="container events">
        <select
          className="event-selector"
          id="selector-log-type"
          name="log-type"
          defaultValue={'event'}
          onChange={e => {
            setLoading(true);
            handleLogTypeChange(e);
          }}
        >
          <option value="events">Events</option>
          <option value="alerts">Alerts</option>
          <option value="oomkills">OOMKills</option>
        </select>
        <select
          className="event-selector"
          id="selector-severity"
          name="severity"
          defaultValue={'Default'}
          onChange={e => {
            setLoading(true);
            handleSeverityChange(e);
          }}
        >
          <option value="default">Default</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
          <option value="critical">Critical</option>
          <option value="alert">Alert</option>
          <option value="emergency">Emergency</option>
          <option value="debug">Debug</option>
        </select>
        {logType === 'oomkills' ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <span className="badge badge-warning" id="lblCartCount">
              {props.analyze.length}
            </span>
          </>
        ) : null}

        {loading && (
          <>
            <p>Loading </p>
            <p className="loader"></p>
          </>
        )}
      </nav>
      <div id="container-event-logs" className="container events">
        {logs.length ? logs : <p>No data</p>}
      </div>
    </div>
  );
};

export default Events;
