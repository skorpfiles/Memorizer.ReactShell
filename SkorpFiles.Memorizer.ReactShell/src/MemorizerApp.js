import React from 'react';
import './MemorizerApp.css';
import UserInfoSection from './UserInfo/UserInfoSection';
import EditorWorkspace from './QuestionnairesEditor/EditorWorkspace'
import developerLogo from './skorpFilesLogo.png';
import { CookiesExpireDays } from './GlobalConstants';
import { CallApi } from './GlobalUtilities';

const currentCookiesVersion = '2';
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
            loggingErrorMessage: null,
            userId: null
        };
    }

    async componentDidMount() {
        try {
            const cookiesVersion = this.getCookiesVersionFromCookies();
            if (cookiesVersion === currentCookiesVersion) {
                const accessTokenFromCookies = this.getAccessTokenFromCookies();
                if (accessTokenFromCookies != null && accessTokenFromCookies !== "") {
                    const userLoginFromCookies = this.getUserLoginFromCookies();
                    const userIdFromCookies = this.getUserIdFromCookies();
                    const response =
                        await CallApi("/Account/Check", "GET", accessTokenFromCookies);

                    if (response.ok) {
                        this.setState({
                            isUserLogged: true,
                            isUserLogging: false,
                            userLogin: userLoginFromCookies,
                            accessToken: accessTokenFromCookies,
                            userId: userIdFromCookies,
                            isLoggingError: false,
                            loggingErrorMessage: null
                        });
                    }
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
                    <EditorWorkspace isUserLogged={this.state.isUserLogged} accessToken={this.state.accessToken} userId={this.state.userId} />
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
                await CallApi("/Account/Token", "POST", null, JSON.stringify({ login, password }));

            if (response.ok) {
                const result = await response.json();

                let expirationDate1 = new Date();
                expirationDate1.setDate(expirationDate1.getDate() + CookiesExpireDays);

                document.cookie = "accessToken=" + result.accessToken + "; expires=" + expirationDate1 + "; ";
                document.cookie = "userLogin=" + result.login + "; expires=" + expirationDate1 + "; ";
                document.cookie = "userId=" + result.userId + "; expires=" + expirationDate1 + "; ";
                document.cookie = "cookiesVersion=" + currentCookiesVersion + "; expires=" + expirationDate1 + "; ";

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
                loggingErrorMessage: "Error: Unable to connect to the API"
            });
        }
    }

    async logOut() {
        try {
            const response = await CallApi("/Account/Logout", "POST", this.state.accessToken);
            if (response.ok) {
                this.setState({
                    isUserLogged: false,
                    isUserLogging: false,
                    userLogin: null,
                    accessToken: null,
                    isLoggingError: false,
                    loggingErrorMessage: null
                });

                document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                document.cookie = "userLogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                document.cookie = "cookiesVersion=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            }
            else {
                const result = await response.json();

                this.setState({
                    isUserLogging: false,
                    isLoggingError: true,
                    loggingErrorMessage: `${response.status} ${result.errorText}`
                });
            }
        }
        catch (error) {
            console.log(error);
            this.setState({
                isUserLogging: false,
                isLoggingError: true,
                loggingErrorMessage: "Error: Unable to logout"
            });
        }
    }

    getAccessTokenFromCookies() {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('accessToken='))
            .split('=')[1];
        return cookieValue;
    }

    getUserLoginFromCookies() {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('userLogin='))
            .split('=')[1];
        return cookieValue;
    }

    getUserIdFromCookies() {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('userId='))
            .split('=')[1];
        return cookieValue;
    }

    getCookiesVersionFromCookies() {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('cookiesVersion='))
            .split('=')[1];
        return cookieValue;
    }
}

export default MemorizerApp;