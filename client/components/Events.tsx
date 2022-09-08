import {useState, useEffect} from 'react';
import EventCard from './EventsCards';
import { EventProps, EventCardProps, EventObject } from '../Types';
import { EvalSourceMapDevToolPlugin } from 'webpack';

const Events = (props: EventProps): JSX.Element => {

  const [events, setEvents]: any = useState([]);

  const handleOnClick = async () => {
    const eventsData = await window.api.getEvents();
    // events is an object with prop "formatttedEvents", which is an array of objects
    // each obj in array has the following keys: namespace, lastSeen, severity, reason, message, object
    const formattedEvents: EventObject[] = eventsData.formattedEvents;
    const eventCards: JSX.Element[] = [];
    for(let i = 0; i < formattedEvents.length; i++){
      eventCards.push(<EventCard key={'event#'+i} eventObj={formattedEvents[i]}/>)
    }

    setEvents(eventCards);

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

  useEffect(() => {

  });

  const handleOnClickAlerts = async () => {
    const alerts = await window.api.getAlerts();
    const eventLogBox = document.getElementById('container-event-logs');
    if (eventLogBox) {
      eventLogBox.innerText = JSON.stringify(alerts);
    }
  };

  return (
    <div id="container-event" className="container events right-side">
      <nav id="container-select" className="container events">
        <select
          className="event-selector"
          id="selector-log-type"
          name="log-type"
          defaultValue={'event'}
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
          CLICK ME FOR EVENTS!
        </button>
        <button type="button" onClick={handleOnClickAlerts}>
          CLICK ME FOR ALERTS!
        </button>
      </nav>
      <div id="container-event-logs" className="container events">
        {events}
      </div>
    </div>
  );
};

export default Events;
