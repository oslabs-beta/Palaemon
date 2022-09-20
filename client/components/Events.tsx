import { useState, useEffect, EffectCallback, useInsertionEffect } from 'react';
import LogCard from './LogCard';
import { EventProps, EventObject } from '../Types';
import { capitalize } from '../../electron/utils';
import { useNavigate } from 'react-router-dom';

const Events = (props: EventProps): JSX.Element => {
  const [logs, setLogs]: any = useState([]);
  const [logType, setLogType]: any = useState<string>('events');
  const [severityType, setSeverityType]: any = useState<string>('Default');
  const [loading, setLoading]: any = useState(true);
  const { analyzedPod, setAnalyzedPod }: any = props;

  const handleLogTypeChange = (e: any) => {
    const logTypeStr = e.target.value;
    setLogType(logTypeStr);
    // console.log(
    //   'handleLogTypeChange is working and current logType state is ',
    //   logType,
    //   ' and e.target.value is ',
    //   e.target.value
    // );
  };

  const handleSeverityChange = (e: any) => {
    const severity = capitalize(e.target.value);
    setSeverityType(severity);
  };

  const handleNoEvents = () => {};

  useEffect(() => {
    // populate and set logCards according to what type of logs is requested.
    // this is a helper function as typescript was not playing nicely with useEffect as an async function
    // window.api.getPods();
    const createLogs = async () => {
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
      setLoading(false);
      for (let i = 0; i < logsData.length; i++) {
        logCards.push(
          <LogCard
            key={i + 200}
            eventObj={logType === 'events' ? logsData[i] : undefined}
            alertObj={logType === 'alerts' ? logsData[i] : undefined}
            oomObj={logType === 'oomkills' ? logsData[i] : undefined}
            logType={logType}
            analyzedPod={analyzedPod}
            setAnalyzedPod={setAnalyzedPod}
            setAnalyzedData={props.setAnalyzedData}
          />
        );
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

  return (
    <div id="container-event" className="container events right-side">
      <nav id="container-select" className="container events">
        <select
          className="event-selector"
          id="selector-log-type"
          aria-label="log-type"
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
        {logType !== 'oomkills' ? (
          <select
            className="event-selector"
            id="selector-severity"
            aria-label="severity-type"
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
        ) : null}
        {loading && (
          <>
            <p>Loading </p>
            <p className="loader"></p>
          </>
        )}
      </nav>
      <div id="container-event-logs" className="container events">
        {logs.length ? (
          logs
        ) : (
          <p className="no-logs-msg">
            No {logType[0].toUpperCase() + logType.slice(1)} in Current
            Namespace
          </p>
        )}
      </div>
    </div>
  );
};

export default Events;
