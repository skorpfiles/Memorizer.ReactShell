import React from 'react';
import StringLine from './StringLine';
class MultilineText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (this.props.text &&
            <React.Fragment>
                {this.props.text.split('\n').map((item, index) => (
                    <StringLine text={this.props.text} item={item} index={index} key={index} />
                ))}
            </React.Fragment>
        )
    }
}

export default MultilineText;