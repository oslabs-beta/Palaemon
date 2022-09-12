import { LogCardProps } from '../Types';

const LogCard = (props: LogCardProps): JSX.Element => {

  // create the header elements
  let headerObj: {[key:string]: string} = {};
  let bodyObj: {[key:string]: string} = {};
  if (props.logType === 'events' && props.eventObj) {
    // part 1: anonymous function with input and output (take in args, returns and object)
    // (({namespace, severity}) => ({namespace, severity}))
    // part 2: invoke the function on props.eventObj
    headerObj = (({namespace, severity}) => ({namespace, severity}))(props.eventObj);
    bodyObj = (({reason, message, object, lastSeen}) => ({reason, message, object, lastSeen}))(props.eventObj);
  }
  else if (props.logType === 'alerts' && props.alertObj) {
    headerObj = (({group, severity}) => ({group, severity}))(props.alertObj);
    bodyObj = (({name, state, description, summary}) => ({name, state, description, summary}))(props.alertObj);
  }
  
  const header: JSX.Element[] = [];
  const body: JSX.Element[] = [];
  // need to make sure order is perserved in objects!!!
  let k = 500;
  for (const x in headerObj){
    const label:string = x[0].toUpperCase() + x.slice(1) +':';
    header.push(<div key={k++}><p><strong>{label}</strong> {headerObj[x]}</p></div>);
  }
  for (const x in bodyObj){
    const label:string = x[0].toUpperCase() + x.slice(1) +':';
    body.push(<div key={k++}><p><strong>{label}</strong> {bodyObj[x]}</p></div>);
  }
  
  return (
    <div className="event-card">
      <header className="event-card-header">
        {header}
      </header>
      {body}
    </div>
  );
};

export default LogCard;
