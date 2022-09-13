import { useState, useEffect, EffectCallback } from 'react';
import LogCard from './LogCard';
import { EventProps, EventObject } from '../Types';
import { filter } from '../../webpack.config';
import { capitalize } from '../../electron/utils';

const Events = (props: EventProps): JSX.Element => {
  const [logs, setLogs]: any = useState([]);
  const [logType, setLogType]: any = useState('events');
  const [severityType, setSeverityType]: any = useState('Default');
  const [loading, setLoading]: any = useState(true);

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
      const testig: any = await window.api.getAllInfo();
      console.log('AM I A PROMISE?, ', testig)

      const logCards: JSX.Element[] = [];
      let logsData;
      if (logType === 'events') {
        // events is an object with prop "formatttedEvents", which is an array of objects
        // each obj in array has the following keys: namespace, lastSeen, severity, reason, message, object
        logsData = await window.api.getEvents();
      } else if (logType === 'alerts') {
        logsData = await window.api.getAlerts();
      }

      for (let i = 0; i < logsData.length; i++) {
        logCards.push(
          <LogCard
            key={i+200}
            eventObj={logType === 'events' ? logsData[i] : undefined}
            alertObj={logType === 'alerts' ? logsData[i] : undefined}
            logType={logType}
          />
        );
      }

      if(logCards.length > 0){
        setLoading(false)
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
          name="log-type"
          defaultValue={'event'}
          onChange={e => {
            setLoading(true)
            handleLogTypeChange(e)
          }}
        >
          <option value="events">Events</option>
          <option value="alerts">Alerts</option>
        </select>
        <select
          className="event-selector"
          id="selector-severity"
          name="severity"
          defaultValue={'Default'}
          onChange={e => {
            setLoading(true)
            handleSeverityChange(e)
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
        {loading && <span>Loading <div className="loader"></div></span>}

      </nav>
      <div id="container-event-logs" className="container events">
        {logs.length ? logs : <p>No data</p>}
      </div>
    </div>
  );
};

export default Events;
