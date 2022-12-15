import React from 'react';
import './UserLoginForm.css';

class UserLoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section className="userlogin">
                    <form>
                        <label>Login:</label>
                        <input type="text" id="login" name="login" />
                        <label>Password:</label>
                        <input type="password" id="password" name="password" />
                        <input type="submit" onClick={() => this.props.setLoggedUser(document.getElementById('login').value)} value="Log In" />
                    </form>
                </section>
            </div>
        );
    }
}

export default UserLoginForm;