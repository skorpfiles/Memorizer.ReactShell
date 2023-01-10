import React from 'react';

class QuestionnairesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            dataIsLoading: true,
            dataIsLoaded: false,
            isLoadedError: false,
            loadedErrorText:''
        };
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
                    <ul>
                        {this.state.items.map(item => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                );
            }
            else if (this.state.isLoadedError) {
                return (<label>{this.state.loadedErrorText}</label>);
            }
        }    
    }
}

export default QuestionnairesList;