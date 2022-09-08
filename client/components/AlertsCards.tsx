import * as React from 'react';
import { AlertCardProps } from '../Types';

const AlertCard = (props: AlertCardProps): JSX.Element => {
  return (
    <div className="event-card">
      <header className="event-card-header">
        <div>
          <p>
            <strong>Group:</strong> {props.alertObj.group}
          </p>
        </div>
        <div>
          <p>
            <strong>Severity:</strong> {props.alertObj.severity}
          </p>
        </div>
      </header>
      <p>
        <strong>Name:</strong> {props.alertObj.name}
      </p>
      <p>
        <strong>State:</strong> {props.alertObj.state}
      </p>
      <p>
        <strong>Description:</strong> {props.alertObj.description}
      </p>
      <p>
        <strong>Summary:</strong> {props.alertObj.summary}
      </p>
      {/* <p>
        <strong>Alerts:</strong> {props.alertObj.alerts}
      </p> */}
    </div>
  );
};

export default AlertCard;
