import React from 'react';
import './UserLoginForm.css';

class UserLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.logIn = this.logIn.bind(this);
    }

    async logIn(e) {
        e.preventDefault();
        this.props.logIn(document.getElementById('login').value, document.getElementById('password').value);
    }

    render() {
        var loadingMessage = this.props.isUserLogging ? (<label>Logging...</label>) : "";

        return (
            <form onSubmit={this.logIn}>
                <label>Login:</label>
                <input type="text" id="login" name="login" />
                <label>Password:</label>
                <input type="password" id="password" name="password" />
                <input type="submit" value="Submit Form" />
                {loadingMessage}
                <label>{this.props.loggingErrorMessage}</label>
            </form>
        );
    }
}

export default UserLoginForm;