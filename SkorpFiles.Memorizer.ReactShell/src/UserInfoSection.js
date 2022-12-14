import React from 'react';
import ReactDOM from 'react-dom/client';
import './UserInfoSection.css';
import UserLoginForm from './UserLoginForm';
import LoggedUserInfoHeader from './LoggedUserInfoHeader';

class UserInfoSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isUserLogged: false, userLogin: null };
    }

    render() {
        if (this.state.isUserLogged)
            return (
                <LoggedUserInfoHeader userLogin={this.state.userLogin} logOut={() => this.logOut()} />
            );
        else
            return (
                <UserLoginForm setLoggedUser={(login) => this.logIn(login)} />
            );
    }

    logIn(login) {
        this.setState({ isUserLogged: true });
        this.setState({ userLogin: login });
    }

    logOut() {
        this.setState({ isUserLogged: false });
        this.setState({ userLogin: null });
    }
}

export default UserInfoSection;