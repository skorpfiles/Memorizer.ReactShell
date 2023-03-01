import React from 'react';

class QuestionButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{margin:"0 2px"}} onClick={() => this.props.doAction(this.props.itemId)}>
                <a href="#" key={this.props.itemId + "-" + this.props.buttonKey}>
                    <img src={this.props.icon} alt={this.props.altText} width="16px" />
                </a>
            </div>
        );
    }


}

export default QuestionButton;