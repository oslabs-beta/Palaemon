import { TooltipProps } from '../Types';

const Tooltip = (props: TooltipProps) => {
  const { position } = props;

  return (
    <div className="modal" style={position}>
      <div className="modal-inner-div">
        <ul className="modalList">
          <p>1. Select an OOMKilled Pod to begin analysis</p>
          <p>
            2. By default, the time interval will be set to 5 minutes before the
            OOMKill event
          </p>
          <p>
            3. To adjust the time, input desired time interval, select a unit of
            time, and click "Query"
          </p>
        </ul>
      </div>
    </div>
  );
};

export default Tooltip;
