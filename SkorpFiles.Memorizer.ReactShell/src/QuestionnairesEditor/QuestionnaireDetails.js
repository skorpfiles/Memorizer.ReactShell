import React from 'react';
import { CallApi } from '../GlobalUtilities';
import Question from './Question.js';
import EditButton from './QuestionButton.js';

class QuestionnairesDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            questionsIsLoading: true,
            questionsIsLoaded: false,
            questionsLoadedError: false,
            questionsLoadingErrorText: '',
            isInEditorMode: false,
            editingQuestionId: null
        };
        this.chooseQuestionToEdit = this.chooseQuestionToEdit.bind(this);
        this.cancelQuestionToEdit = this.cancelQuestionToEdit.bind(this);
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
                await CallApi("/Repository/Questions?questionnaireId=" + this.props.currentItem.id, "GET", this.props.accessToken);

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
            this.setState({
                questions: null,
                questionsIsLoading: false,
                questionsIsLoaded: false,
                questionsLoadedError: true,
                questionsLoadingErrorText: "Error: Unable to get questionnaire details."
            });
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
                    <div key={item.id}>
                        <Question item={item} controlsBlocked={this.state.isInEditorMode} isInEditorMode={this.state.editingQuestionId == item.id} doEdit={this.chooseQuestionToEdit} cancelEdit={this.cancelQuestionToEdit} />
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

    chooseQuestionToEdit(id) {
        this.setState({
            isInEditorMode: true,
            editingQuestionId: id
        });
    }

    cancelQuestionToEdit() {
        this.setState({
            isInEditorMode: false,
            editingQuestionId: null
        });
    }
}

export default QuestionnairesDetails;