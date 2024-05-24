import React from 'react';
class StringLine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                {this.props.item}
                {this.props.index < this.props.text.split('\n').length - 1 && <br />}
            </React.Fragment>
        )
    }
}

export default StringLine;