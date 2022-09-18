import { ModalProps } from '../Types';

const DetailsModal = (props: ModalProps) => {
  const {
    name,
    usage,
    request,
    resource,
    unit,
    limit,
    parent,
    namespace,
    position,
    close,
  } = props;
  // console.log('detail modal rendering soon')

  return (
    <div className="modal" style={position}>
      <div className="modalClose">
        <svg
          onClick={close}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          id="modalCloseBtn"
          className="bi bi-x-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </div>
      <ul className="modalList">
        <li className="modalDetail">
          <strong>Name:</strong> {name}
        </li>
        <li className="modalDetail">
          <strong>Namespace:</strong> {namespace}
        </li>
        <li className="modalDetail">
          <strong>Parent:</strong> {parent}
        </li>
        <li className="modalDetail">
          <strong>Usage:</strong> {usage}
        </li>
        <li className="modalDetail">
          <strong>Request:</strong> {request}
        </li>
        <li className="modalDetail">
          <strong>Limit:</strong> {limit}
        </li>
        <li className="modalDetail">
          <strong>Unit:</strong> {unit}
        </li>
        <li className="modalDetail">
          <strong>Resource:</strong> {resource}
        </li>
      </ul>
    </div>
  );
};

export default DetailsModal;
