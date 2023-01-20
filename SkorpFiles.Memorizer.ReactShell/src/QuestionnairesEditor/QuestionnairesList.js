import React from 'react';
import { ApiHostUrl } from '../GlobalConstants';

class QuestionnairesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            dataIsLoading: true,
            dataIsLoaded: false,
            isLoadedError: false,
            loadedErrorText: ''
        };
        this.doEvent = this.doEvent.bind(this);
    }

    async componentDidMount() {
        try {
            const response =
                await fetch(ApiHostUrl + "/Repository/Questionnaires",
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
            return (<label style={{color:"white"}}>Data is loading...</label>);
        else {
            if (this.state.dataIsLoaded) {
                return (
                    <div>
                        <div style={{ width: "100%", color: "white", fontSize: "2em", padding: "10px" }}  >
                            Questionnaires
                        </div>
                        <ul>
                            {this.state.items.map(item => (
                                <div key={item.id} onClick={() => {
                                    this.props.switchItem(item);
                                }}><li><a href="#" style={{ color: "white" }} >{item.name}</a></li></div>
                            ))}
                        </ul>
                    </div>
                );
            }
            else if (this.state.isLoadedError) {
                return (<label>{this.state.loadedErrorText}</label>);
            }
        }
    }

    doEvent(id) {
        console.log(id);
    }
}

export default QuestionnairesList;