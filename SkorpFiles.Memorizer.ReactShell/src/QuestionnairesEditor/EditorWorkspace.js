import React from 'react';
import QuestionnairesList from './QuestionnairesList';
import QuestionnaireDetails from './QuestionnaireDetails';

class EditorWorkspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { id: 1, text: "item1" },
                { id: 2, text: "item2" }
            ],
            currentItem: null
        };
    }

    render() {
        let questionnairesListField;
        if (this.state.items.length != 0)
            questionnairesListField = <QuestionnairesList
                items={this.state.items}
                accessToken={this.props.accessToken}
                switchItem={(newItem) => this.switchItem(newItem)}
            />;
        else
            questionnairesListField = <label style={{ color: "white" }}>No items</label>;

        let workspaceField;
        if (this.state.currentItem != null)
            workspaceField = (<QuestionnaireDetails currentItem={this.state.currentItem} accessToken={this.props.accessToken} />);
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
        this.setState({
            currentItem: newItem
        });
    }
}

export default EditorWorkspace;