import React from 'react';

class QuestionnaireToolsPanelButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div onClick={this.props.doAction}>
                <a href="#" style={{ color: "white" }}>{this.props.text}</a>
            </div>
        )
    }
}

export default QuestionnaireToolsPanelButton;