import React from 'react';
import TypedAnswerSectionElementCss from './TypedAnswerSectionElement.module.css';

class TypedAnswerSectionElement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={TypedAnswerSectionElementCss.TypedAnswerSectionElement}>{this.props.children}</div>
        )
    }
}

export default TypedAnswerSectionElement;