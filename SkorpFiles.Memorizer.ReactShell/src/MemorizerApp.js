import React from 'react';
import './MemorizerApp.css';
import UserInfoSection from './UserInfo/UserInfoSection';
import EditorWorkspace from './QuestionnairesEditor/EditorWorkspace'
import developerLogo from './skorpFilesLogo.png';
import GlobalConstants from './GlobalConstants.js';
import { useState } from 'react';

//class MemorizerApp extends React.Component {

//    constructor(props) {
//        super(props);
//        this.logIn = this.logIn.bind(this);
//        this.state = {
//            isUserLogged: false,
//            isUserLogging: false,
//            userLogin: null,
//            userToken: null,
//            isLoggingError: false,
//            loggingErrorMessage: null
//        };
//    }

//    render() {
//        let body;

//        if (this.state.isUserLogged)
//            body = (
//                <section>
//                    <EditorWorkspace isUserLogged={this.state.isUserLogged} />
//                </section>
//            );
//        else
//            body =
//                <div className="messageinsteadofworkspace">
//                    <label>Please log in for using this tool.</label>
//                </div>

//        return (
//            <div>
//                <div className="userloginsection">
//                    <UserInfoSection
//                        isUserLogged={this.state.isUserLogged}
//                        userLogin={this.state.userToken}
//                        logIn={(login,password) => this.logIn(login,password)}
//                        logOut={() => this.logOut()} />
//                </div>

//                {body}

//                <footer>
//                    <div className="footertable">
//                        <div className="footerleftlabel">
//                            <p>SkorpFiles.Memorizer.ReactShell &#8226; Test React Application</p>
//                        </div>
//                        <div className="footerrightlogo">
//                            <img src={developerLogo} alt="SkorP Files Logo" />
//                        </div>

//                    </div>
//                </footer>

//            </div>
//            )
//    }

//    async logIn(login, password) {
//        ////fetch("https://localhost:7205/Account/Token",
//        //    //{
//        //    //    method: "POST",
//        //    //    body: JSON.stringify({ login, password })
//        //    //})
//        //fetch("https://jsonplaceholder.typicode.com/users")
//        //    .then(res => res.json())
//        //    .then(
//        //        (result) => {
//        //            alert(result);
//        //            //this.setState({
//        //            //    isUserLogged: true,
//        //            //    userLogin: login,
//        //            //    userToken: result.accessToken,
//        //            //    isLoggingError: false,
//        //            //    loggingErrorMessage: null
//        //            //});
//        //        },
//        //        (error) => {
//        //            alert(error);
//        //            this.setState({
//        //                isUserLogged: true,
//        //                userLogin: login,
//        //                userToken: null,
//        //                isLoggingError: true,
//        //                loggingErrorMessage: error
//        //            });
//        //        }
//        //    )

//        //const response = await fetch('https://reqres.in/api/users', {
//        //    method: 'GET',
//        //    headers: {
//        //        Accept: 'application/json',
//        //    },
//        //});
//        //if (!response.ok)
//        //    alert(response.status);

//        //const result = response.json();

//        //console.log('result is: ', JSON.stringify(result, null, 4));

//        this.setState({
//            isUserLogged: false,
//            isUserLogging: true,
//            userLogin: null,
//            userToken: null,
//            isLoggingError: false,
//            loggingErrorMessage: null
//        });

//        await 

//        this.setState({ isUserLogged: true });
//        this.setState({ userLogin: login });
//    }

//    logOut() {
//        this.setState({ isUserLogged: false });
//        this.setState({ userLogin: null });
//    }
//}

class MemorizerApp extends React.Component {
    constructor(props) {
        super(props);
        //this.logIn = this.logIn.bind(this);
        //this.state = { isUserLogged: false, userLogin: null, userToken: null, isLoggingError: false, loggingErrorMessage: null };
        this.state = {
            data: [],
            isLoading: false,
            err: ''
        };
        this.setData = this.setData.bind(this);
        this.setIsLoading = this.setIsLoading.bind(this);
        this.setErr = this.setErr.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    setData(newValue) {
        this.setState({ data: newValue });
    }

    setIsLoading(newValue) {
        this.setState({ isLoading: newValue });
    }

    setErr(newValue) {
        this.setState({ setErr: newValue });
    }

    //const [data, setData] = useState({ data: [] });
    //const [isLoading, setIsLoading] = useState(false);
    //const [err, setErr] = useState('');

    async handleClick() {
        this.setIsLoading(true);

        try {

            const response =
                //await fetch('https://reqres.in/api/users', {
                //    method: 'GET',
                //    headers: {
                //        Accept: 'application/json',
                //    },
                //});

                await fetch("https://localhost:7205/Account/Token",
                    {
                        method: "POST",
                        body: JSON.stringify({ login: 'TestUser13', password: 'Rorobia_1' }),
                        headers: {
                            'content-type': 'application/json;charset=UTF-8',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers':'Access-Control-Allow-Origin,Access-Control-Allow-Headers,content-type'
                           }
                    });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();

            console.log('result is: ', JSON.stringify(result, null, 4));

            this.setData(result);
        } catch (err) {
            this.setErr(err.message);
        } finally {
            this.setIsLoading(false);
        }
    };

    //console.log(data);
    render() {
        return (
            <div>
                {this.state.err && <h2>{this.state.err}</h2>}

                <button onClick={this.handleClick}>Fetch data</button>

                {this.state.isLoading && <h2>Loading...</h2>}
                <label>{JSON.stringify(this.state.data.data)}</label>

                {this.state.data.data?.map(person => {
                    return (
                        <div key={person.id}>
                            <h2>{person.email}</h2>
                            <h2>{person.first_name}</h2>
                            <h2>{person.last_name}</h2>
                            <br />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default MemorizerApp;