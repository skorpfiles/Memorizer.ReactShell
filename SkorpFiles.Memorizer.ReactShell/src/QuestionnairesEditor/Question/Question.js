import React from 'react';
import QuestionInDisplayMode from './QuestionInDisplayMode'
import QuestionInEditMode from './QuestionInEditMode.js';

class Question extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let result;

        if (!this.props.isInEditorMode) {
            result = (
                <QuestionInDisplayMode
                    item={this.props.item}
                    controlsBlocked={this.props.controlsBlocked}
                    startEditingQuestion={this.props.startEditingQuestion}
                    saveScrollPosition={this.props.saveScrollPosition}
                    restoreScrollPosition={this.props.restoreScrollPosition}
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
                    saveScrollPosition={this.props.saveScrollPosition}
                    restoreScrollPosition={this.props.restoreScrollPosition}
                />
            );
        }
        return result;
    }
}

export default Question;