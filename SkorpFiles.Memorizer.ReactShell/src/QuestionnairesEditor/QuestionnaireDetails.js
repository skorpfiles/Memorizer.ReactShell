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
            itemWithChanges: null,
            editingQuestionId: null,
            editingQuestionError: false,
            editingQuestionErrorText: '',
            addingQuestionEnabled: false,
        };
        this.chooseQuestionToEdit = this.chooseQuestionToEdit.bind(this);
        this.cancelQuestionToEdit = this.cancelQuestionToEdit.bind(this);
        this.editQuestion = this.editQuestion.bind(this);
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
        var addQuestion = (
            <div style={{ width: "100%", margin: "10px 0px", padding: "5px 10px", border: "1px solid white", color: "white" }}>
                <div>
                    <a href="#" style={{ color: "white" }}>Add a question</a>
                </div>
            </div>);
        if (this.state.questionsIsLoading)
            questionsField = (<label style={{ color: "white" }}>Loading...</label>);
        else if (this.state.questionsIsLoaded) {
            if (this.state.questions.length != 0) {
                questionsField = (
                    <div>
                        {addQuestion}
                        {this.state.questions.map(item =>
                        (
                            <div key={item.id}>
                                <Question
                                    item={item}
                                    controlsBlocked={this.state.isInEditorMode}
                                    isInEditorMode={this.state.editingQuestionId == item.id}
                                    doEdit={this.chooseQuestionToEdit}
                                    cancelEdit={this.cancelQuestionToEdit}
                                    saveChanges={this.editQuestion} />
                            </div>
                        ))}
                    </div>
                )
            }
            else {
                questionsField = (
                    <div>
                        {addQuestion}
                        <div>
                            <label style={{ color: "white" }}>No items.</label>
                        </div>
                    </div>
                );
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
            editingQuestionId: id,
            editingQuestionError: false,
            editingQuestionErrorText: ''
        });
    }

    cancelQuestionToEdit() {
        this.setState({
            isInEditorMode: false,
            editingQuestionId: null,
            editingQuestionError: false,
            editingQuestionErrorText: ''
        });
    }

    async editQuestion(item) {
        try {
            var body_editQuestion = {
                questionnaireId: this.props.currentItem.id,
                updatedQuestions: [
                    item
                ]
            };

            console.log(body_editQuestion);

            const response_editQuestion = await CallApi("/Repository/Questions", "POST", this.props.accessToken, JSON.stringify(body_editQuestion));

            if (response_editQuestion.ok) {
                this.setState({
                    isInEditorMode: false,
                    editingQuestionId: null,
                    editingQuestionError: false,
                    editingQuestionErrorText: ''
                });
                await this.refresh();
            }
            else {
                const result_editQuestion = await response_editQuestion.json();

                this.setState({
                    editingQuestionError: true,
                    editingQuestionErrorText: `${response_editQuestion.status} ${result_editQuestion.errorText}`
                });
            }
        }
        catch(error) {
            console.log(error);
            this.setState({
                editingQuestionError: true,
                editingQuestionErrorText: "Error: Unable to save changes."
            });
        }
    }

    async startAddingQuestion() {
        this.setState({
            addingQuestionEnabled: true
            })
    }
}

export default QuestionnairesDetails;