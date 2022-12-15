import React from 'react';

class LoggedUserInfoHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section class="userlogin">
                    <i>{this.props.userLogin}</i> &#8226; <span class="logOutLink"><a href="#" onClick={()=>this.props.logOut()} id="logOutLink">Log Out</a></span>
                </section>
            </div>
            )
    }
}

export default LoggedUserInfoHeader;