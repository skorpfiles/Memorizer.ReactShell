import React from 'react';
import { CallApi } from '../GlobalUtilities';
import Question from './Question.js';
import EditButton from './QuestionButton.js';
import { v4 as uuidv4 } from 'uuid';

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
            questionWithChanges: null,
            editingQuestionId: null,
            editingQuestionError: false,
            editingQuestionErrorText: '',
            addingQuestionEnabled: false,
        };
        this.cancelQuestionToEdit = this.cancelQuestionToEdit.bind(this);
        this.addTypedAnswer = this.addTypedAnswer.bind(this);
        this.deleteTypedAnswer = this.deleteTypedAnswer.bind(this);
        this.handleEnabledCheckboxChange = this.handleEnabledCheckboxChange.bind(this);
        this.handleEttChange = this.handleEttChange.bind(this);
        this.handleReferenceChange = this.handleReferenceChange.bind(this);
        this.handleQuestionTypeChange = this.handleQuestionTypeChange.bind(this);
        this.handleQuestionTextChange = this.handleQuestionTextChange.bind(this);
        this.handleQuestionUntypedAnswerChange = this.handleQuestionUntypedAnswerChange.bind(this);
        this.startEditingQuestion = this.startEditingQuestion.bind(this);
        this.saveEditingQuestion = this.saveEditingQuestion.bind(this);

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
                                    item={this.state.editingQuestionId != item.id ? item : this.state.questionWithChanges}
                                    itemWithChanges={this.state.questionWithChanges}
                                    controlsBlocked={this.state.isInEditorMode}
                                    isInEditorMode={this.state.editingQuestionId == item.id}
                                    startEditingQuestion={this.startEditingQuestion}
                                    cancelEdit={this.cancelQuestionToEdit}
                                    handleQuestionTextChange={this.handleQuestionTextChange}
                                    handleQuestionUntypedAnswerChange={this.handleQuestionUntypedAnswerChange}
                                    handleQuestionTypeChange={this.handleQuestionTypeChange}
                                    handleReferenceChange={this.handleReferenceChange}
                                    handleEnabledCheckboxChange={this.handleEnabledCheckboxChange}
                                    handleEttChange={this.handleEttChange}
                                    saveEditingQuestion={this.saveEditingQuestion}
                                    addTypedAnswer={this.addTypedAnswer}
                                    deleteTypedAnswer={this.deleteTypedAnswer}
                                />
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

    cancelQuestionToEdit() {
        this.setState({
            isInEditorMode: false,
            editingQuestionId: null,
            editingQuestionError: false,
            editingQuestionErrorText: ''
        });
    }

    async saveEditingQuestion() {
        try {
            var newItem = {
                id: this.state.questionWithChanges.id,
                type: this.state.questionWithChanges.type,
                text: this.state.questionWithChanges.text,
                untypedAnswer: this.state.questionWithChanges.untypedAnswer,
                typedAnswers: this.state.questionWithChanges.typedAnswers.map(typedAnswer => typedAnswer.text),
                estimatedTrainingTimeSeconds: this.state.questionWithChanges.estimatedTrainingTimeSeconds,
                enabled: this.state.questionWithChanges.enabled,
                reference: this.state.questionWithChanges.reference
            };

            var body_editQuestion = {
                questionnaireId: this.props.currentItem.id,
                updatedQuestions: [
                    newItem
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

    addTypedAnswer() {
        let newTypedAnswerText = prompt("Type the answer text", "");
        if (newTypedAnswerText != null && newTypedAnswerText != "") {
            this.setState(prevState => ({
                questionWithChanges: {
                    ...prevState.questionWithChanges,
                    typedAnswers: [
                        ...prevState.questionWithChanges.typedAnswers,
                        {
                            id: uuidv4(),
                            text: newTypedAnswerText
                        }
                    ]
                }
            }));
        }
    }

    deleteTypedAnswer(id) {
        this.setState(prevState => ({
            questionWithChanges: {
                ...prevState.questionWithChanges,
                typedAnswers: prevState.questionWithChanges.typedAnswers.filter(ans => ans.id != id)
            }
        }))
    }

    handleEnabledCheckboxChange(event) {
        this.setState(prevState => ({
            questionWithChanges: {
                ...prevState.questionWithChanges,
                enabled: event.target.checked
            }
        }));
    }

    handleEttChange(event) {
        this.setState(prevState => ({
            questionWithChanges: {
                ...prevState.questionWithChanges,
                estimatedTrainingTimeSeconds: event.target.value
            }
        }));
    }

    handleReferenceChange(event) {
        this.setState(prevState => ({
            questionWithChanges: {
                ...prevState.questionWithChanges,
                reference: event.target.value
            }
        }));
    }

    handleQuestionTypeChange(event) {
        this.setState(prevState => ({
            questionWithChanges: {
                ...prevState.questionWithChanges,
                type: event.target.value
            }
        }))
    }

    handleQuestionTextChange(event) {
        this.setState(prevState => ({
            questionWithChanges: {
                ...prevState.questionWithChanges,
                text: event.target.value
            }
        }))
    }

    handleQuestionUntypedAnswerChange(event) {
        this.setState(prevState => ({
            questionWithChanges: {
                ...prevState.questionWithChanges,
                untypedAnswer: event.target.value
            }
        }))
    }

    startEditingQuestion(item) {
        this.setState({
            questionWithChanges: {
                id: item.id,
                type: item.type,
                text: item.text,
                untypedAnswer: item.untypedAnswer,
                typedAnswers: item.typedAnswers,
                estimatedTrainingTimeSeconds: item.estimatedTrainingTimeSeconds,
                enabled: item.enabled,
                reference: item.reference
            },
            isInEditorMode: true,
            editingQuestionId: item.id,
            editingQuestionError: false,
            editingQuestionErrorText: ''
        });
    }

    async startAddingQuestion() {
        this.setState({
            addingQuestionEnabled: true
            })
    }
}

export default QuestionnairesDetails;