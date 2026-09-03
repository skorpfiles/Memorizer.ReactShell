import React from 'react';
import QuestionnaireToolsPanelButton from './QuestionnaireToolsPanelButton';
import QuestionnaireLabel from './QuestionnaireLabel';

class QuestionnaireToolsPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style={{ width: "100%", margin: "10px 0px", padding: "5px 10px", border: "1px solid white", color: "white", display: "flex", flexWrap: "wrap" }}>
                    {this.props.canBeEdited && (<QuestionnaireToolsPanelButton
                        doAction={this.props.startAddingQuestion}
                        text="Add a question"
                    />)}
                    {!this.props.canBeEdited && (<div>You cannot edit this questionnaire.</div>)}
                </div>
                {this.props.labelsForQuestionnaire.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "horizontal", gap: "8px", flexWrap: "wrap" }}>
                        {this.props.labelsForQuestionnaire.map(label => (<QuestionnaireLabel key={label} labelName={label} selected={this.props.selectedLabels.includes(label)} handleChoosing={() => this.props.handleLabelChoosing(label)} />))}
                    </div>
                )}
            </div>
        )
    }
}

export default QuestionnaireToolsPanel;