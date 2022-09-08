import * as React from 'react';
import { EventProps } from '../Types';
import BasicSelect from '../components/EventSelectButton';

const Events = (props: EventProps): JSX.Element => {
  const handleOnClick = async () => {
    const events = await window.api.getEvents();
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
    const eventLogBox = document.getElementById('container-event-logs');
    if (eventLogBox) {
      // eventLogBox.innerText = stupiderStuff.eventHeaders[0];
      // eventLogBox.innerText = JSON.stringify(stupiderStuff);
      eventLogBox.innerText = JSON.stringify(events);
    }
    // else console.log('eventLogBox is not being grabbed by getElementById');
  };

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
        <BasicSelect />
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
      <div id="container-event-logs" className="container events"></div>
    </div>
  );
};

export default Events;
