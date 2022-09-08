import * as React from 'react';
import { EventCardProps } from '../Types';


const EventCard = (props: EventCardProps): JSX.Element => {
  return (
  <div className='event-card'>
    <header className='event-card-header'>
      <div>
        <p><strong>Namespace:</strong> {props.eventObj.namespace}</p>
      </div>
      <div>
        <p><strong>Severity:</strong> {props.eventObj.severity}</p>
      </div>
    </header>
    <p><strong>Reason:</strong> {props.eventObj.reason}</p>
    <p><strong>Message:</strong> {props.eventObj.message}</p>
    <p><strong>Object:</strong> {props.eventObj.object}</p>
    <p><strong>Last Seen:</strong> {props.eventObj.lastSeen}</p>
  </div>
  )
}

export default EventCard;