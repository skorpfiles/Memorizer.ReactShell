import React from 'react';
import TypedAnswerSectionElement from './TypedAnswerSectionElement';
import addIcon from '../Icons/add.png';

class AddTypedAnswerButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TypedAnswerSectionElement>
                <div onClick={() => this.props.addTypedAnswer()}>
                    <a href="#">
                        <img src={addIcon} alt="Add a typed answer" width="12px" />
                    </a>
                </div>
            </TypedAnswerSectionElement>
        )
    }
}

export default AddTypedAnswerButton;