import React from 'react';
import QuestionInDisplayMode from './QuestionInDisplayMode'
import QuestionInEditMode from './QuestionInEditMode.js';

class Question extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var result;

        if (!this.props.isInEditorMode) {
            result = (
                <QuestionInDisplayMode
                    item={this.props.item}
                    controlsBlocked={this.props.controlsBlocked}
                    startEditingQuestion={this.props.startEditingQuestion}
                />
            );
        }
        else {
            result = (
                <QuestionInEditMode
                    item={this.props.item}
                    cancelEdit={this.props.cancelEdit}
                    handleQuestionTextChange={this.props.handleQuestionTextChange}
                    handleQuestionUntypedAnswerChange={this.props.handleQuestionUntypedAnswerChange}
                    handleQuestionTypeChange={this.props.handleQuestionTypeChange}
                    handleReferenceChange={this.props.handleReferenceChange}
                    handleEnabledCheckboxChange={this.props.handleEnabledCheckboxChange}
                    handleEttChange={this.props.handleEttChange}
                    saveEditingQuestion={this.props.saveEditingQuestion}
                    addTypedAnswer={this.props.addTypedAnswer}
                    deleteTypedAnswer={this.props.deleteTypedAnswer}
                    deleteQuestion={this.props.deleteQuestion}
                />
            );
        }
        return result;
    }
}

export default Question;