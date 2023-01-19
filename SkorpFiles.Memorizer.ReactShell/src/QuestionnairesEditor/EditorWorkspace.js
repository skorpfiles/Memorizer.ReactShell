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
            questionnairesListField = <label>No items</label>;

        let workspaceField;
        if (this.state.currentItem != null)
            workspaceField = (<QuestionnaireDetails currentItem={this.state.currentItem} accessToken={this.props.accessToken} />);
        else
            workspaceField = (<label>Nothing is selected</label>);

        return (
            <div>
                <nav style={{height:"100%"}}>
                    {questionnairesListField}
                </nav>

                <workspace style={{ height: "100%" }}>
                    {workspaceField}
                </workspace>
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