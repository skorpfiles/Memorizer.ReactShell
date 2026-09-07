import React from 'react';
class QuestionnaireLabel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ color: this.props.selected ? "black" : "white", border: "1px solid white", borderRadius: "10px", padding: "2px 5px", cursor: "pointer", fontSize: "0.8em", backgroundColor: this.props.selected ? "yellow" : null }} key={this.props.key} onClick={this.props.handleChoosing}>{this.props.labelName}</div>
        )
    }
}

export default QuestionnaireLabel;