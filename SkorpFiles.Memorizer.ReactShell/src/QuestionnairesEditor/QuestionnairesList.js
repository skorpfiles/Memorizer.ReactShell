import React from 'react';
import List from './List.js';

class QuestionnairesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            dataIsLoading: true,
            dataIsLoaded: false,
            isLoadedError: false,
            loadedErrorText: '',
            users:[
                {
                    name: 'Deepak',
                    rollNo: '123',
                },
                {
                    name: 'Yash',
                    rollNo: '124',
                },
                {
                    name: 'Raj',
                    rollNo: '125',
                },
                {
                    name: 'Rohan',
                    rollNo: '126',
                },
                {
                    name: 'Puneet',
                    rollNo: '127',
                },
                {
                    name: 'Vivek',
                    rollNo: '128',
                },
                {
                    name: 'Aman',
                    rollNo: '129',
                },
            ]
        };
        this.doEvent = this.doEvent.bind(this);
    }

    async componentDidMount() {
        try {
            const response =
                await fetch("https://localhost:7205/Repository/Questionnaires",
                    {
                        method: "GET",
                        headers: {
                            'content-type': 'application/json;charset=UTF-8',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin,Access-Control-Allow-Headers,content-type, Authorization',
                            'Authorization': `Bearer ${this.props.accessToken}`
                        }
                    });
            if (response.ok) {
                const result = await response.json();

                this.setState({
                    items: result.questionnaires,
                    dataIsLoading: false,
                    dataIsLoaded: true,
                    isLoadedError: false,
                    loadedErrorText:''
                });
            }
            else {
                const result = await response.json();

                this.setState({
                    items: [],
                    dataIsLoading: false,
                    dataIsLoaded: false,
                    isLoadedError: true,
                    loadedErrorText: `${response.status} ${result.errorText}`
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        if (this.state.dataIsLoading)
            return (<label>Data is loading...</label>);
        else {
            if (this.state.dataIsLoaded) {
                return (
                    <div>
                        <h1>Questionnaires</h1>
                        <ul>
                            {this.state.items.map(item => (
                                <div key={item.id} onClick={() => {
                                    this.handlechange(item.id);
                                }}><li><a href="#">{item.id}</a></li></div>
                            ))}
                        </ul>
                    </div>
                );
            }
            else if (this.state.isLoadedError) {
                return (<label>{this.state.loadedErrorText}</label>);
            }
        }

        //return (
        //    <div
        //        style={{
        //            display: 'flex',
        //            flexDirection: 'column',
        //            alignItems: 'flex-start',
        //            justifyContent: 'center',
        //            height: '100vh',
        //            margin: '40px',
        //        }}>
        //        <h4>Rendering List of components with array of data</h4>

        //        {this.state.users.map((Users, index) => {
        //            return (
        //                <div
        //                    style={{
        //                        display: 'flex',
        //                        flexDirection: 'column',
        //                        alignItems: 'flex-start',
        //                        justifyContent: 'center',
        //                        width: '200px',
        //                        margin: '20px',
        //                        backgroundColor: 'lightblue',
        //                        cursor: 'pointer',
        //                    }}
        //                    onClick={() => {
        //                        this.handlechange(index);
        //                    }}
        //                    key={index}>
        //                    {/*<List key={index} name={Users.name}*/}
        //                    {/*    rollNo={Users.rollNo} />*/}
        //                    <div key={index}>
        //                        <div>Name of student {Users.name}</div>
        //                        <div>Roll number of student {Users.rollNo}</div>
        //                    </div>
        //                </div>
        //            );
        //        })}
        //    </div>
        //);
    }

    handlechange(index) {
        //const newUsers = [...this.state.users];
        //newUsers[index].name = 'New Name';
        //newUsers[index].rollNo = 'New RollNo';
        //this.setState({ users: newUsers });
        alert(index);
    };

    doEvent(id) {
        console.log(id);
    }
}

export default QuestionnairesList;