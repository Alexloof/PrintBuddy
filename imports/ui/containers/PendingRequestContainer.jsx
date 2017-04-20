import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import React from 'react';

import {PendingBuddiesList} from '../components/PendingBuddiesListComponent';
import MapContainer from './MapContainer';
import {acceptBuddy} from '../../api/request/methods';
import {displayError} from '../helpers/errors';
import Stepper from 'react-stepper-horizontal';

class PendingRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultCenter: this.props.request.requestorPosition(),
            clickedBuddyId: '',
        };
        this.onViewClicked = this.onViewClicked.bind(this);
        this.onChooseClicked = this.onChooseClicked.bind(this);
    }

    onViewClicked(e) {
        this.setState({
            defaultCenter: e.position,
            clickedBuddyId: e._id,
        })
    }

    onChooseClicked(buddyId) {
        acceptBuddy.call({requestId :this.props.request._id, buddyId:buddyId}, (err, res) => {
            if (err) {
                if (err.error === 'request.acceptBuddy.exist') {
                    displayError("Error!", 'You already accepted this job!');
                } else {
                    displayError("Error!", 'Something went wrong :( ');
                }
            }
        });
    }

    render() {
        return (
            <div>
                <div className="step-by-step">
                    <Stepper steps={[{title:'Request'}, {title:'Pending'}, {title:'Chat'}, {title:'Done'}]} activeStep={1} size={40} completeColor={"green"} activeColor={"orange"} />
                </div>
                <div className="row">
                    <div className="col l10 offset-l1">
                        <PendingBuddiesList 
                            buddylist={this.props.request.possiblePrintBuddies()} 
                            onView={this.onViewClicked}
                            onChoose={this.onChooseClicked}
                        />
                        <MapContainer
                            clickedId={this.state.clickedBuddyId} 
                            isBuddy={false} 
                            markers={this.props.request.possiblePrintBuddies()} 
                            defaultCenter={this.state.defaultCenter}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

PendingRequest.propTypes = {
    request: React.PropTypes.object
};

// const PendingRequestContainer = createContainer(() => {

//     return {};
// }, PendingRequest);


export default PendingRequest;