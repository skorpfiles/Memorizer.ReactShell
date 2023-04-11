import React from 'react';

class QuestionnairesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.dataIsLoading)
            return (<label style={{color:"white"}}>Data is loading...</label>);
        else {
            if (this.props.dataIsLoaded) {
                return (
                    <div>
                        <div style={{ width: "100%", color: "white", fontSize: "2em", padding: "10px" }}  >
                            Questionnaires
                        </div>
                        <ul>
                            {this.props.items.map(item => (
                                <div key={item.id} onClick={() => {
                                    this.props.switchItem(item);
                                }}><li><a href="#" style={{ color: "white" }} >{item.name}</a></li></div>
                            ))}
                        </ul>
                        {!this.props.isInEditorMode && (
                            <div style={{ width: "100%", color: "white", padding: "0 0 0 25px" }} onClick={this.props.addQuestionnaire}>
                                <a href="#" style={{ color: "white" }}>Add a questionnaire</a>
                            </div>
                        )}
                        {this.props.currentQuestionnaire && !this.props.isInEditorMode && (
                            <div style={{ width: "100%", color: "white", padding: "0 0 0 25px" }} onClick={this.props.deleteCurrentQuestionnaire}>
                                <a href="#" style={{ color: "white" }}>Delete the current questionnaire</a>
                            </div>
                        )}
                    </div>
                );
            }
            else if (this.props.isLoadedError) {
                return (<label>{this.state.loadedErrorText}</label>);
            }
        }
    }
}

export default QuestionnairesList;