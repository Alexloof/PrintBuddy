import React from 'react';
import FlipMove from 'react-flip-move';

const ActiveJobList = ({ listofjobs, onChatClicked }) => {
    const renderlist = () => {
        return (
            listofjobs.map((job, index) => {
                    return (
                        <li className="collection-item" key={index}>
                            <div className="content-for-li">
                                <p>Requestor: {job.requestorName()} - Reward: {job.reward} {job.currency} - Distance: {job.radius} meter , Address - {job.requestorPosition().address}</p>
                                <div className="buttongroup">
                                    <button className="btn waves-effect waves-light" onClick={() => onChatClicked(job._id)}>Chat</button>
                                </div>
                            </div>
                        </li>
                    );
            })
        );
    }
    return (
        <div className="col s12 m12 l12">
            <ul className="collection with-header" id="joblist">
                <li className="collection-header"><h5>Active printjobs</h5></li>
                <FlipMove maintainContainerHeight={true}>
                    {renderlist()}
                </FlipMove>
            </ul>
        </div>
    );
}

export default ActiveJobList;
