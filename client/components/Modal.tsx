import React, { useState, useEffect } from 'react';
import { SvgInfo } from '../Types';
// import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Modals extends SvgInfo {
    position: {left: string, top: string}
}

const DetailsModal = (props: Modals) => {

    const { name, usage, request, limit, parent, namespace, position } = props;

    // const [details, setDetails] = useState({});
    // const [isFetching, setIsFetching] = useState(true);

    // useEffect(() => {
    //     if (id) {
    //         setIsFetching(true);
    //         fetch(`/api/${type}?id=${id}`)
    //             .then(resp => resp.json())
    //             .then(data => {
    //                 setDetails(data);
    //                 setIsFetching(false);
    //             })
    //             .catch(err => console.log('DetailsModal: fetch /api: ERROR: ', err));
    //     } else {
    //         setDetails({ name: 'Unavailable' });
    //         setIsFetching(false);
    //     }
    // }, [id, type]);

    // if (isFetching) {
    //     return (
    //         <div className="modal" style={position}>
    //             <p>Fetching species data...</p>
    //         </div>
    //     );
    // }

    let info;


    info = (
        <ul className="modalList">
            <li className="modalDetail">Name: {name}</li>
            <li className="modalDetail">Usage: {usage}</li>
            <li className="modalDetail">Request: {request}</li>
            <li className="modalDetail">Limit: {limit}</li>
            <li className="modalDetail">Name Space: {namespace}</li>
            <li className="modalDetail">Parent: {parent}</li>
        </ul>
    );


    return (
        <div className="modal" style={position}>
            <div className="modalHeading">
                {/* <h4 className="modalName">{details.name || details.title || 'Unknown'}</h4> */}
                {/* <FAIcon icon={faTimes} onClick={closeModal} /> */}
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