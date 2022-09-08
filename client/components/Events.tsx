import * as React from "react";
import { EventProps } from "../Types";
import { useState, useEffect } from 'react'
// import BasicSelect from "../components/EventSelectButton";

const Events = (props: EventProps): JSX.Element => {

  const handleOnClick = async () => {
    // const events = await window.api.getEvents();
    
    // const stupidStuff = await window.api.getNodes();
    console.log('I AM WINDOW ',window)
    // const stupiderStuff = await window.api.getLogs();
    const data = await window.api.getMemoryUsageByPods()

    // console.log('------------------------------------------------------------');
    console.log('SUCCESS FETCH, HERE IS DATA: ', data)
    // console.log('I AM LOGS HAHAHAHAHA ', stupiderStuff);
    // useEffect(() => {
    //   setMemUsage(data)
    // })
    // const eventLogBox = document.getElementById("container-event-logs");
    // if(eventLogBox) eventLogBox.innerText = events;
    // else console.log('eventLogBox is not being grabbed by getElementById');
  };

  return (
    <div id="container-event" className="container events right-side">
      <nav id="container-select" className="container events">
        {/* <BasicSelect /> */}
        <select
          className="event-selector"
          id="selector-severity"
          name="severity"
          defaultValue={"default"}
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
        <button type="button" onClick={handleOnClick}>CLICK ME!</button>
      </nav>
      <div id="container-event-logs" className="container events"></div>
    </div>
  );
};

export default Events;
