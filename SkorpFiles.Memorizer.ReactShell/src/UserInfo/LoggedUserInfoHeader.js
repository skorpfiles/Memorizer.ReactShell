import React from 'react';
import './LoggedUserInfoHeader.css';

class LoggedUserInfoHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="maintext">
                <i>{this.props.userLogin}</i> &#8226; <span className="logoutlink"><a href="#" className="maintext" onClick={()=>this.props.logOut()} id="logOutLink">Log Out</a></span>
            </section>
            )
    }
}

export default LoggedUserInfoHeader;