import React from 'react';
import QuestionnaireToolsPanelButton from './QuestionnaireToolsPanelButton';

class QuestionnaireToolsPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ width: "100%", margin: "10px 0px", padding: "5px 10px", border: "1px solid white", color: "white", display: "flex", flexWrap: "wrap" }}>
                <QuestionnaireToolsPanelButton
                    doAction={this.props.startAddingQuestion}
                    text="Add a question"
                />
            </div>
        )
    }
}

export default QuestionnaireToolsPanel;