import React from 'react';
import { ApiHostUrl } from '../GlobalConstants';

class QuestionnairesDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            questionsIsLoading: true,
            questionsIsLoaded: false,
            questionsLoadedError: false,
            questionsLoadingErrorText: ''
        };
    }

    async componentDidMount() {
        await this.refresh();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.currentItem.id !== prevProps.currentItem.id) {
            this.setState({
                    questions: null,
                    questionsIsLoading: true,
                    questionsIsLoaded: false,
                    questionsLoadedError: false,
                    questionsLoadingErrorText: ''
                })
            await this.refresh();
        }            
    } 

    async refresh() {
        try {
            const response1 =
                await fetch(ApiHostUrl + "/Repository/Questions?questionnaireId=" + this.props.currentItem.id,
                    {
                        method: "GET",
                        headers: {
                            'content-type': 'application/json;charset=UTF-8',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin,Access-Control-Allow-Headers,content-type, Authorization',
                            'Authorization': `Bearer ${this.props.accessToken}`
                        }
                    });
            if (response1.ok) {
                const result = await response1.json();

                this.setState({
                    questions: result.questions,
                    questionsIsLoading: false,
                    questionsIsLoaded: true,
                    questionsLoadedError: false,
                    questionsLoadingErrorText: ''
                });
            }
            else {
                const result = await response1.json();

                this.setState({
                    questions: null,
                    questionsIsLoading: false,
                    questionsIsLoaded: false,
                    questionsLoadedError: true,
                    questionsLoadingErrorText: `${response1.status} ${result.errorText}`
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        var questionsField;
        if (this.state.questionsIsLoading)
            questionsField = (<label style={{ color: "white" }}>Loading...</label>);
        else if (this.state.questionsIsLoaded) {
            if (this.state.questions.length != 0) {
                questionsField = this.state.questions.map(item =>
                (
                    <div style={{ display: "table", width: "100%", margin: "10px 0px", backgroundColor: "#6495ed", fontFamily: "Arial" }}>
                        <div style={{ display: "table-row", fontSize: "1.5em" }}>
                            <div style={{ display: "table-cell", padding: "10px" }}><em>{item.text}</em></div>
                        </div>
                        <div style={{ display: "table-row", backgroundColor: "#87cefa", padding: "1em" }}>
                            <div style={{ display: "table-cell", padding: "10px" }} ><em>{item.untypedAnswer}</em></div>
                        </div>
                    </div>
                )
                )
            }
            else {
                questionsField = (<label style={{ color: "white" }}>No items.</label>);
            }
        }
        else if (this.state.questionsLoadedError)
            questionsField = (<label style={{ color: "white" }}>{this.state.questionsLoadingErrorText}</label>);

        return (
            <div>
                <div style={{ width: "100%", backgroundColor: "#191970", color: "white", fontSize: "2em", padding: "10px" }}  >
                {this.props.currentItem.name}
                </div>
                <div style={{ margin:"10px" }}>
                    {questionsField}
                </div>
            </div>);
    }
}

export default QuestionnairesDetails;