import React from 'react';
import './MemorizerApp.css';
import UserInfoSection from './UserInfo/UserInfoSection';
import EditorWorkspace from './QuestionnairesEditor/EditorWorkspace'
import developerLogo from './skorpFilesLogo.png';
import GlobalConstants from './GlobalConstants.js';

class MemorizerApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isUserLogged: false, userLogin: null, userToken: null, isLoggingError: false, loggingErrorMessage: null };
    }

    render() {
        let body;

        if (this.state.isUserLogged)
            body = (
                <section>
                    <EditorWorkspace isUserLogged={this.state.isUserLogged} />
                </section>
            );
        else
            body =
                <div class="messageinsteadofworkspace">
                    <label>Please log in for using this tool.</label>
                </div>

        return (
            <div>
                <div class="userloginsection">
                    <UserInfoSection
                        isUserLogged={this.state.isUserLogged}
                        userLogin={this.state.userToken}
                        logIn={(login,password) => this.logIn(login,password)}
                        logOut={() => this.logOut()} />
                </div>

                {body}

                <footer>
                    <div class="footertable">
                        <div class="footerleftlabel">
                            <p>SkorpFiles.Memorizer.ReactShell &#8226; Test React Application</p>
                        </div>
                        <div class="footerrightlogo">
                            <img src={developerLogo} alt="SkorP Files Logo" />
                        </div>
                        
                    </div>
                </footer>

            </div>
            )
    }

    logIn(login, password) {
        fetch("https://localhost:7205/Account/Token",
            {
                method: "POST",
                body: JSON.stringify({ login, password })
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isUserLogged: true,
                        userLogin: login,
                        userToken: result.accessToken,
                        isLoggingError: false,
                        loggingErrorMessage: null
                    });
                },
                (error) => {
                    alert(error);
                    this.setState({
                        isUserLogged: true,
                        userLogin: login,
                        userToken: null,
                        isLoggingError: true,
                        loggingErrorMessage: error
                    });
                }
            )
    }

    logOut() {
        this.setState({ isUserLogged: false });
        this.setState({ userLogin: null });
    }
}

export default MemorizerApp;