import { useState, useEffect, EffectCallback } from 'react';
import EventCard from './EventsCards';
import AlertCard from './AlertsCards';
import { EventProps, EventCardProps, EventObject } from '../Types';
import { EvalSourceMapDevToolPlugin } from 'webpack';
// import { Alert } from 'react-bootstrap';

const Events = (props: EventProps): JSX.Element => {
  const [logs, setLogs]: any = useState([]);
  const [logType, setLogType]: any = useState('events');

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

  useEffect(() => {

    // populate and set logCards according to what type of logs is requested. 
    // this is a helper function as typescript was not playing nicely with useEffect as an async function
    const createLogs = async () => {
      const logCards: JSX.Element[] = [];
      let logsData;
      if (logType === 'events') {
        // events is an object with prop "formatttedEvents", which is an array of objects
        // each obj in array has the following keys: namespace, lastSeen, severity, reason, message, object
        logsData = await window.api.getEvents();
      }
      else if (logType === 'alerts') {
        logsData = await window.api.getAlerts();
      }
      for (let i = 0; i < logsData.length; i++) {
        logCards.push(
          <LogCard key={`${logType}#${i}`} 
                   eventObj={logType === 'events' ? logsData[i] : undefined} 
                   alertObj={logType === 'alerts' ? logsData[i] : undefined} 
                   logType={logType} />
        );
      }
      setLogs(logCards);
    };

    createLogs();

  }, [logType]);

  return (
    <div id="container-event" className="container events right-side">
      <nav id="container-select" className="container events">
        <select
          className="event-selector"
          id="selector-log-type"
          name="log-type"
          defaultValue={'event'}
          onChange={e => handleLogTypeChange(e)}
        >
          <option value="events">Events</option>
          <option value="alerts">Alerts</option>
        </select>
        <select
          className="event-selector"
          id="selector-severity"
          name="severity"
          defaultValue={'default'}
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
      </nav>
      <div id="container-event-logs" className="container events">
        {logs}
      </div>
    </div>
  );
};

export default Events;
