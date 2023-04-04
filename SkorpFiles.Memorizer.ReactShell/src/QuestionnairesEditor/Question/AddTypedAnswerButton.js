import React from 'react';
import addIcon from '../Icons/add.png';

class AddTypedAnswerButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ margin: "0 5px 0 5px", padding: "2px", border: "1px solid black", borderRadius: "5px" }} onClick={() => this.props.addTypedAnswer()}>
                <a href="#">
                    <img src={addIcon} alt="Add a typed answer" width="12px" />
                </a>
            </div>
        )
    }
}

export default AddTypedAnswerButton;