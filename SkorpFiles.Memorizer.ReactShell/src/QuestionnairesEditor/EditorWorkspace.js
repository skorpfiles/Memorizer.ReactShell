import React from 'react';
import QuestionnairesList from './QuestionnairesList';

class EditorWorkspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { id: 1, text: "item1" },
                { id: 2, text: "item2" }
            ]
        };
    }

    render() {
        let questionnairesListField;
        if (this.state.items.length != 0)
            questionnairesListField = <QuestionnairesList items={this.state.items} />;
        else
            questionnairesListField = <label>No items</label>;

        return (
            <div>
                <nav>
                    {questionnairesListField}
                </nav>

                <workspace>
                    <label>Nothing is selected</label>
                </workspace>
            </div>
        );
    }
}

export default EditorWorkspace;