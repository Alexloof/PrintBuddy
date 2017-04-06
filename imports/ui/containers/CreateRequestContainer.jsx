import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import React from 'react';
import { browserHistory } from 'react-router';

import CreateRequestComponent from "../components/CreateRequestComponent";
import {insert} from '../../api/request/methods';
import {displayError} from '../helpers/errors';

class CreateRequest extends React.Component {
	constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(request) {
        insert.call(request, (err, res) => {
            if (err) {
                if (err.error === 'request.insert.unauthorized') {
                    displayError("Wrong!", 'You need to login to add request');
                } else {
                    // Unexpected error, handle it in the UI somehow
                    displayError("Error!", 'Something went wrong :( ');
                }
            } else {
                browserHistory.push('/request/pending');
            }
        });
    }
	render() {
		return (
			<div>
				<h2>CreateRequest Container</h2>
                <CreateRequestComponent  submit={this.onSubmit}/>
			</div>
		);
	}
}

const CreateRequestContainer = createContainer(() => {

    return {
    };
}, CreateRequest);


export default CreateRequestContainer;