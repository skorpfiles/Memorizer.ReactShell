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
            accessToken: null,
            isLoggingError: false,
            loggingErrorMessage: null
        };
    }

    async componentDidMount() {
        try {
            var accessTokenFromCookies = this.getAccessTokenFromCookies();
            if (accessTokenFromCookies != null) {
                var userLoginFromCookies = this.getUserLoginFromCookies();
                const response =
                    await fetch(ApiHostUrl + "/Account/Check",
                        {
                            method: "GET",
                            headers: {
                                'content-type': 'application/json;charset=UTF-8',
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin,Access-Control-Allow-Headers,content-type, Authorization',
                                'Authorization': `Bearer ${accessTokenFromCookies}`
                            }
                        });
                if (response.ok) {
                    this.setState({
                        isUserLogged: true,
                        isUserLogging: false,
                        userLogin: userLoginFromCookies,
                        accessToken: accessTokenFromCookies,
                        isLoggingError: false,
                        loggingErrorMessage: null
                    });
                }
            }
        }
        catch {

        }
    }

    render() {
        let body;

        if (this.state.isUserLogged)
            body = (
                <div className="workarea">
                    <EditorWorkspace isUserLogged={this.state.isUserLogged} accessToken={this.state.accessToken} />
                </div>
            );
        else
            body =
                <div className="workarea mainpadding">
                    <label className="maintext">Please log in for using this tool.</label>
                </div>

        return (
            <div className="content">
                <div className="header mainpadding maintext">
                    <UserInfoSection
                        isUserLogged={this.state.isUserLogged}
                        isUserLogging={this.state.isUserLogging}
                        userLogin={this.state.userLogin}
                        logIn={(login, password) => this.logIn(login, password)}
                        logOut={() => this.logOut()}
                        isLoggingError={this.state.isLoggingError}
                        loggingErrorMessage={this.state.loggingErrorMessage}
                    />
                </div>

                {body}

                <div className="footer mainpadding maintext">
                    <div className="footerleftlabel">
                        <p>SkorpFiles.Memorizer.ReactShell &#8226; Test React Application</p>
                    </div>
                    <div className="footerrightlogo">
                        <img src={developerLogo} alt="SkorP Files Logo" />
                    </div>
                </div>

            </div>
            )
    }

    async logIn(login, password) {
        try {
            this.setState({
                isUserLogged: false,
                isUserLogging: true,
                userLogin: null,
                accessToken: null,
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

                document.cookie = "accessToken=" + result.accessToken + "; userLogin=" + result.userLogin + "; ";

                this.setState({
                    isUserLogged: true,
                    isUserLogging: false,
                    userLogin: result.login,
                    accessToken: result.accessToken,
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
                    accessToken: null,
                    isLoggingError: true,
                    loggingErrorMessage: `${response.status} ${result.errorText}`
                });
            }
        }
        catch (error) {
            console.log(error);
            this.setState({
                isUserLogged: false,
                isUserLogging: false,
                userLogin: null,
                accessToken: null,
                isLoggingError: true,
                loggingErrorMessage: "Error: Unable to connect to API"
            });
        }
    }

    logOut() {
        this.setState({
            isUserLogged: false,
            isUserLogging: false,
            userLogin: null,
            accessToken: null,
            isLoggingError: false,
            loggingErrorMessage: null
        });
    }

    getAccessTokenFromCookies() {
        var cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('accessToken='))
            .split('=')[1];
        return cookieValue;
    }

    getUserLoginFromCookies() {
        var cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('userLogin='))
            .split('=')[1];
        return cookieValue;
    }
}

export default MemorizerApp;