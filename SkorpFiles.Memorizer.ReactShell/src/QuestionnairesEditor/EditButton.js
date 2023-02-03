import React from 'react';
import editIcon from './edit.png';

class EditButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href="#" key={this.props.itemId + "-edit"}>
                <img src={editIcon} alt="Edit" width="16px" />
            </a>
        );
    }


}

export default EditButton;