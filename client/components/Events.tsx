import { useState, useEffect, EffectCallback } from 'react';
import EventCard from './EventsCards';
import AlertCard from './AlertsCards';
import { EventProps, EventCardProps, EventObject } from '../Types';
import { EvalSourceMapDevToolPlugin } from 'webpack';

const Events = (props: EventProps): JSX.Element => {
  const [isEvents, setIsEvents] = useState(true);
  const [events, setEvents]: any = useState([]);
  const [alerts, setAlerts]: any = useState([]);
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

  const handleOnClick = async () => {
    const eventsData = await window.api.getEvents();
    // events is an object with prop "formatttedEvents", which is an array of objects
    // each obj in array has the following keys: namespace, lastSeen, severity, reason, message, object
    const formattedEvents: EventObject[] = eventsData.formattedEvents;
    const eventCards: JSX.Element[] = [];
    for (let i = 0; i < formattedEvents.length; i++) {
      eventCards.push(
        <EventCard key={'event#' + i} eventObj={formattedEvents[i]} />
      );
    }

    setEvents(eventCards);
    setIsEvents(true);

    // console.log(window);
    // const stupiderStuff = await window.api.getLogs();
    // console.log('type of StupiderStuff: ', typeof stupiderStuff);
    // console.log('this is what stupiderStuff is: ', stupiderStuff);
    // console.log('type of StupiderStuff: ', typeof events);
    // console.log('this is what stupiderStuff is: ', events);
    // const stupidStuff = await window.api.getNodes();

    // when in doubt, console.log it out.
    // console.log('I AM EVENTS HAHA ', events);
    // console.log('------------------------------------------------------------');
    // console.log('------------------------------------------------------------');
    // console.log('I AM NODES HHAAHA ', stupidStuff);
    // const eventLogBox = document.getElementById('container-event-logs');
    // if (eventLogBox) {
    //   // eventLogBox.innerText = stupiderStuff.eventHeaders[0];
    //   // eventLogBox.innerText = JSON.stringify(stupiderStuff);
    //   // eventLogBox.appendChild(eventCards);
    // }
    // else console.log('eventLogBox is not being grabbed by getElementById');
  };
  // Promise<asd>
  // when logType changes, re-display the logs
  useEffect(() => {
    const createLogs = async () => {
      if (logType === 'events') {
        const eventsData = await window.api.getEvents();
        // events is an object with prop "formatttedEvents", which is an array of objects
        // each obj in array has the following keys: namespace, lastSeen, severity, reason, message, object
        const formattedEvents: EventObject[] = eventsData.formattedEvents;
        const eventCards: JSX.Element[] = [];
        for (let i = 0; i < formattedEvents.length; i++) {
          eventCards.push(
            <EventCard key={'event#' + i} eventObj={formattedEvents[i]} />
          );
        }
        setEvents(eventCards);
      } else if (logType === 'alerts') {
        const alertsData = await window.api.getAlerts();
        const alertCards: JSX.Element[] = [];
        for (let i = 0; i < alerts.length; i++) {
          alertCards.push(
            <AlertCard key={'alert#' + i} alertObj={alertsData[i]} />
          );
        }
        setAlerts(alertCards);
      }
    };
    createLogs();
  }, [logType]);

  const handleOnClickAlerts = async () => {
    const alerts = await window.api.getAlerts();
    console.log('ALERTS', alerts);
    // const eventLogBox = document.getElementById('container-event-logs');
    const alertCards: JSX.Element[] = [];
    for (let i = 0; i < alerts.length; i++) {
      alertCards.push(<AlertCard key={'event#' + i} alertObj={alerts[i]} />);
    }

    setAlerts(alertCards);
    setIsEvents(false);
  };

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
        <button type="button" onClick={handleOnClick}>
          Show Events
        </button>
        <button type="button" onClick={handleOnClickAlerts}>
          Show Alerts
        </button>
      </nav>
      <div id="container-event-logs" className="container events">
        {logType === 'events' ? events : alerts}
      </div>
    </div>
  );
};

export default Events;
