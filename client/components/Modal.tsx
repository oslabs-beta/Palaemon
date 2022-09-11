import { ModalProps } from '../Types';

const DetailsModal = (props: ModalProps) => {

    const { name, usage, request, limit, parent, namespace, position, close } = props;
    // console.log('detail modal rendering soon')

    return (
        <div className="modal" style={position}>
            <div className="modalHeading">
                {/* <h4 className="modalName">{details.name || details.title || 'Unknown'}</h4> */}
                {/* <FAIcon icon={faTimes} onClick={closeModal} /> */}
                <h1 id='modalhead' onClick={close} >X</h1>
            </div>
            <ul className="modalList">
                <li className="modalDetail">Name: {name}</li>
                <li className="modalDetail">Usage: {usage}</li>
                <li className="modalDetail">Request: {request}</li>
                <li className="modalDetail">Limit: {limit}</li>
                <li className="modalDetail">Name Space: {namespace}</li>
                <li className="modalDetail">Parent: {parent}</li>
            </ul>
        </div>
    );
};

export default DetailsModal;