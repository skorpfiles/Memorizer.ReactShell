import React from 'react';
import ReactDOM from 'react-dom/client';
import './UserInfoSection.css';
import UserLoginForm from './UserLoginForm';
import LoggedUserInfoHeader from './LoggedUserInfoHeader';

class UserInfoSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isUserLogged)
            return (
                <LoggedUserInfoHeader userLogin={this.props.userLogin} logOut={() => this.props.logOut()} />
            );
        else
            return (
                <UserLoginForm
                    logIn={(login, password) => this.props.logIn(login, password)}
                    isLoggingError={this.props.isLoggingError}
                    loggingErrorMessage={this.props.loggingErrorMessage}
                    isUserLogging={this.props.isUserLogging}
                />
            );
    }
}

export default UserInfoSection;