import React from 'react';

class LoggedUserInfoHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section className="userlogin">
                    <i>{this.props.userLogin}</i> &#8226; <span className="logOutLink"><a href="#" style={{color:"white"}} onClick={()=>this.props.logOut()} id="logOutLink">Log Out</a></span>
                </section>
            </div>
            )
    }
}

export default LoggedUserInfoHeader;