import React from 'react';
import './MemorizerApp.css';
import UserInfoSection from './UserInfo/UserInfoSection';
import EditorWorkspace from './QuestionnairesEditor/EditorWorkspace'
import developerLogo from './skorpFilesLogo.png';
import { ApiHostUrl } from './GlobalConstants';
import { useState } from 'react';

class MemorizerApp extends React.Component {

    constructor(props) {
        super(props);
        this.logIn = this.logIn.bind(this);
        this.state = {
            isUserLogged: false,
            isUserLogging: false,
            userLogin: null,
            userToken: null,
            isLoggingError: false,
            loggingErrorMessage: null
        };
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
                <div className="messageinsteadofworkspace">
                    <label>Please log in for using this tool.</label>
                </div>

        return (
            <div>
                <div className="userloginsection">
                    <UserInfoSection
                        isUserLogged={this.state.isUserLogged}
                        userLogin={this.state.userToken}
                        logIn={(login, password) => this.logIn(login, password)}
                        logOut={() => this.logOut()}
                        isLoggingError={this.state.isLoggingError}
                        loggingErrorMessage={this.state.loggingErrorMessage}
                    />
                </div>

                {body}

                <footer>
                    <div className="footertable">
                        <div className="footerleftlabel">
                            <p>SkorpFiles.Memorizer.ReactShell &#8226; Test React Application</p>
                        </div>
                        <div className="footerrightlogo">
                            <img src={developerLogo} alt="SkorP Files Logo" />
                        </div>

                    </div>
                </footer>

            </div>
            )
    }

    async logIn(login, password) {
        try {
            this.setState({
                isUserLogged: false,
                isUserLogging: true,
                userLogin: null,
                userToken: null,
                isLoggingError: false,
                loggingErrorMessage: null
            });

            const response =
                await fetch(ApiHostUrl + "/Account/Token",
                    {
                        method: "POST",
                        body: JSON.stringify({ login, password }),
                        headers: {
                            'content-type': 'application/json;charset=UTF-8',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin,Access-Control-Allow-Headers,content-type'
                        }
                    });

            if (response.ok) {
                const result = await response.json();

                this.setState({
                    isUserLogged: true,
                    isUserLogging: false,
                    userLogin: result.login,
                    userToken: result.accessToken,
                    isLoggingError: false,
                    loggingErrorMessage: null
                });
            }
            else {
                const result = await response.json();

                this.setState({
                    isUserLogged: false,
                    isUserLogging: false,
                    userLogin: null,
                    userToken: null,
                    isLoggingError: true,
                    loggingErrorMessage: `${response.status} ${result.errorText}`
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    logOut() {
        this.setState({
            isUserLogged: false,
            isUserLogging: false,
            userLogin: null,
            userToken: null,
            isLoggingError: false,
            loggingErrorMessage: null
        });
    }
}

export default MemorizerApp;