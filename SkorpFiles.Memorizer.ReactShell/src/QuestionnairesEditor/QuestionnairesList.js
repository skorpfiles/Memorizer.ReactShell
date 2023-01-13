import React from 'react';

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
                                    this.doEvent(item.id);
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
    }

    doEvent(id) {
        console.log(id);
    }
}

export default QuestionnairesList;