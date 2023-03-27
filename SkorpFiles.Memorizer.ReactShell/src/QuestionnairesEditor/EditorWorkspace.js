import React from 'react';
import QuestionnairesList from './QuestionnairesList';
import QuestionnaireDetails from './QuestionnaireDetails';

class EditorWorkspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentItem: null,
            isInEditorMode:false
        };
        this.setEditorMode = this.setEditorMode.bind(this);
    }

    render() {
        let questionnairesListField = (<QuestionnairesList
                items={this.state.items}
                accessToken={this.props.accessToken}
                switchItem={(newItem) => this.switchItem(newItem)}
                isInEditorMode={this.state.isInEditorMode}
            />);

        let workspaceField;
        if (this.state.currentItem != null)
            workspaceField = (<QuestionnaireDetails currentItem={this.state.currentItem} accessToken={this.props.accessToken} isInEditorMode={this.state.isInEditorMode} setEditorMode={this.setEditorMode} />);
        else
            workspaceField = (<label style={{ color: "white" }}>Nothing is selected</label>);

        return (
            <div style={{ display: "flex", height:"100%" }}>
                <div style={{ flex: "0 1 500px", backgroundColor: "#000080", color:"white", padding:"10px" }}>
                    {questionnairesListField}
                </div>

                <div style={{ flex:"0 1 100%", backgroundColor: "#0000CD", padding: "10px" }}>
                    {workspaceField}
                </div>
            </div>
        );
    }

    switchItem(newItem) {
        if (!this.state.isInEditorMode) {
            this.setState({
                currentItem: newItem
            });
        }
    }

    setEditorMode(val) {
        this.setState({
            isInEditorMode: val
        });
    }
}

export default EditorWorkspace;