import React from 'react';

class QuestionnairesDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <label>{this.props.currentItem.id}</label>
            <label>{this.props.currentItem.name}</label>
        </div>);
    }
}

export default QuestionnairesDetails;