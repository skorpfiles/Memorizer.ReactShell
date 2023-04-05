import React from 'react';

class TypedAnswerSectionElement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ margin: "0 5px 0 5px", padding: "2px", border: "1px solid black", borderRadius: "5px", position: "relative" }}>{this.props.children}</div>
        )
    }
}

export default TypedAnswerSectionElement;