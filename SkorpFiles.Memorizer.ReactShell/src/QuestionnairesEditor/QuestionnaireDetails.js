import React from 'react';
import { CallApi } from '../GlobalUtilities';
import Question from './Question/Question.js';
import { v4 as uuidv4 } from 'uuid';
import QuestionnaireToolsPanel from './QuestionnaireToolsPanel';

class QuestionnairesDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: null,
            questionsIsLoading: true,
            questionsIsLoaded: false,
            questionsLoadedError: false,
            questionsLoadingErrorText: '',
            questionWithChanges: null,
            editingQuestionId: null,
            editingQuestionError: false,
            editingQuestionErrorText: '',
            addingQuestionEnabled: false,
            addingQuestionLastType: "task",
            addingQuestionLastEstimatedTrainingTimeSeconds: 5
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
        this.startAddingQuestion = this.startAddingQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
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
            this.props.restoreScrollPosition();
        }            
    }

    async refresh() {
        try {
            const response1 =
                await CallApi("/Repository/Questions?questionnaireId=" + this.props.currentItem.id + "&sortField=addedTime&sortDirection=descending&pageNumber=1&pageSize=1000", "GET", this.props.accessToken);

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
        const addQuestion = (
            <QuestionnaireToolsPanel
                startAddingQuestion={this.startAddingQuestion}
                deleteQuestionnaire={this.deleteCurrentQuestionnaire}
                canBeEdited={this.props.currentItem.ownerId === this.props.userId }
            />
        )
        let questionsField;
        if (this.state.questionsIsLoading)
            questionsField = (<label style={{ color: "white" }}>Loading...</label>);
        else if (this.state.questionsIsLoaded) {
            if (this.state.questions.length != 0) {
                questionsField = (
                    <div>
                        {addQuestion}
                        {this.state.questions.map(item =>
                        (
                            <Question
                                key={item.id}
                                item={this.state.editingQuestionId != item.id ? item : this.state.questionWithChanges}
                                controlsBlocked={this.props.isInEditorMode}
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
                                deleteQuestion={this.deleteQuestion}
                                saveScrollPosition={this.props.saveScrollPosition}
                                restoreScrollPosition={this.props.restoreScrollPosition}
                            />
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
        this.props.saveScrollPosition();
        if (this.state.addingQuestionEnabled && this.state.questionWithChanges!=null) {
            this.setState(prevState => ({
                questions: prevState.questions.filter(question => question.id != this.state.questionWithChanges.id)
            }));
        }
        this.props.setEditorMode(false);
        this.setState({
            editingQuestionId: null,
            editingQuestionError: false,
            editingQuestionErrorText: '',
            addingQuestionEnabled: false
        });
    }

    async saveEditingQuestion() {
        try {
            this.props.saveScrollPosition();
            const newItem = {
                id: this.state.questionWithChanges.id,
                type: this.state.questionWithChanges.type,
                text: this.state.questionWithChanges.text,
                untypedAnswer: this.state.questionWithChanges.untypedAnswer != '' ? this.state.questionWithChanges.untypedAnswer : null,
                typedAnswers: this.state.questionWithChanges.typedAnswers.map(typedAnswer => typedAnswer.text),
                estimatedTrainingTimeSeconds: this.state.questionWithChanges.estimatedTrainingTimeSeconds,
                enabled: this.state.questionWithChanges.enabled,
                reference: this.state.questionWithChanges.reference != '' ? this.state.questionWithChanges.reference : null
            };

            let body_editQuestion;

            if (this.state.addingQuestionEnabled) {
                body_editQuestion = {
                    questionnaireId: this.props.currentItem.id,
                    createdQuestions: [
                        newItem
                    ]
                }
            }
            else {
                body_editQuestion = {
                    questionnaireId: this.props.currentItem.id,
                    updatedQuestions: [
                        newItem
                    ]
                };
            }

            const response_editQuestion = await CallApi("/Repository/Questions", "POST", this.props.accessToken, JSON.stringify(body_editQuestion));


            if (response_editQuestion.ok) {
                this.props.setEditorMode(false);
                this.setState(prevState => ({
                    editingQuestionId: null,
                    editingQuestionError: false,
                    editingQuestionErrorText: '',
                    addingQuestionEnabled: false,
                    addingQuestionLastType: prevState.questionWithChanges.type,
                    addingQuestionLastEstimatedTrainingTimeSeconds: prevState.questionWithChanges.estimatedTrainingTimeSeconds
                }));
                await this.refresh();
            }
            else {
                this.props.restoreScrollPosition();
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
        const newTypedAnswerText = prompt("Type the answer text", "");
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
        this.props.saveScrollPosition();
        this.props.setEditorMode(true);
        this.setState({
            questionWithChanges: {
                id: item.id,
                type: item.type,
                text: item.text ?? '',
                untypedAnswer: item.untypedAnswer ?? '',
                typedAnswers: item.typedAnswers,
                estimatedTrainingTimeSeconds: item.estimatedTrainingTimeSeconds,
                enabled: item.enabled,
                reference: item.reference ?? ''
            },
            editingQuestionId: item.id,
            editingQuestionError: false,
            editingQuestionErrorText: ''
        });
    }

    async startAddingQuestion() {
        if (!this.props.isInEditorMode) {
            const newQuestionDraft = {
                id: uuidv4(),
                type: this.state.addingQuestionLastType,
                text: '',
                untypedAnswer: '',
                typedAnswers: [],
                estimatedTrainingTimeSeconds: this.state.addingQuestionLastEstimatedTrainingTimeSeconds,
                enabled: true,
                reference: ''
            }
            this.props.setEditorMode(true);
            this.setState(prevState => ({
                addingQuestionEnabled: true,
                questions: [
                    newQuestionDraft,
                    ...prevState.questions
                ],
                questionWithChanges: newQuestionDraft,
                editingQuestionId: newQuestionDraft.id,
                editingQuestionError: false,
                editingQuestionErrorText: ''
            }))
        }
    }

    async deleteQuestion(id) {
        if (!this.state.addingQuestionEnabled) {
            const confirmed = window.confirm("Do you really want to delete the question?");
            if (confirmed) {
                try {
                    this.props.saveScrollPosition();
                    const body = {
                        questionnaireId: this.props.currentItem.id,
                        deletedQuestions: [
                            {
                                id
                            }
                        ]
                    }

                    const response = await CallApi("/Repository/Questions", "POST", this.props.accessToken, JSON.stringify(body));
                    if (response.ok) {
                        this.props.setEditorMode(false);
                        this.setState({
                            editingQuestionId: null,
                            editingQuestionError: false,
                            editingQuestionErrorText: '',
                            addingQuestionEnabled: false
                        });
                        await this.refresh();
                    }
                    else {
                        const result = await response.json();

                        this.setState({
                            editingQuestionError: true,
                            editingQuestionErrorText: `${response.status} ${result.errorText}`
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                    this.setState({
                        editingQuestionError: true,
                        editingQuestionErrorText: "Error: Unable to save changes."
                    });
                }
            }
        }
        else {
            this.cancelQuestionToEdit();
        }
    }
}

export default QuestionnairesDetails;