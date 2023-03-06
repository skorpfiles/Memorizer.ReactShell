import React from 'react';
import QuestionButton from './QuestionButton.js';
import editIcon from './edit.png';
import closeIcon from './close.png';
import deleteIcon from './delete.png';
import saveIcon from './floppy_save_guardar.png';
import addIcon from './add.png';
import TextareaAutosize from 'react-textarea-autosize';

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.setMouseOnElementFlag = this.setMouseOnElementFlag.bind(this);
        this.setMouseOnTypedAnswerFlag = this.setMouseOnTypedAnswerFlag.bind(this);
        this.state = {
            mouseOnElement: false,
            selectedTypedAnswerId: null
        }
    }

    setMouseOnElementFlag(param) {
        if ((param == true && !this.props.controlsBlocked) || param == false)
            this.setState({ mouseOnElement: param });
    }

    setMouseOnTypedAnswerFlag(typedAnswerId) {
        this.setState({ selectedTypedAnswerId: typedAnswerId });
    }

    render() {
        var result;

        if (!this.props.isInEditorMode) {
            result =
                (
                <div style={{ display: "table", width: "100%", margin: "10px 0px", backgroundColor: "#87cefa", fontFamily: "Arial" }}
                    onMouseEnter={() => this.setMouseOnElementFlag(true)}
                    onMouseLeave={() => this.setMouseOnElementFlag(false)}
                >
                    <div style={{ display: "table-row", fontSize: "1.5em", backgroundColor: "#6495ed" }}>
                        <div style={{ display: "table-cell", padding: "10px" }}>
                            <div style={{ width: "100%", display: "flex" }} >
                                <div style={{ flex: "1 0 auto" }} >
                                    <em>{this.props.item.text}</em>
                                </div>
                                <div>
                                    {this.state.mouseOnElement && (
                                        <QuestionButton itemId={this.props.item.id} doAction={()=>this.props.doEdit(this.props.item.id)} icon={editIcon} altText="edit" buttonKey="edit" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ display: "table-row" }}>
                        <div style={{ display: "table-cell", padding: "10px" }} >
                            <em>{this.props.item.untypedAnswer}</em>
                        </div>
                    </div>
                    {(this.props.item.typedAnswers != null && this.props.item.typedAnswers.length != 0) && (
                        <div style={{ display: "table-row" }}>
                            <div style={{ display: "table-cell", padding: "0 5px 0 5px" }} >
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    {this.props.item.typedAnswers.map(ans =>
                                    (
                                        <div key={ans.id} style={{ border: "1px solid black", borderRadius: "5px", margin: "0 5px 10px 5px", padding: "2px" }}>
                                            <em>{ans.text}</em>
                                        </div>
                                    )
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div>
                );
        }
        else {
            result =
                (
                <div style={{ display: "table", width: "100%", margin: "10px 0px", backgroundColor: "white", fontFamily: "Arial" }}>
                    <div style={{ display: "table-row", fontSize: "1.5em", backgroundColor: "#E6E6FA" }}>
                        <div style={{ display: "table-cell", padding: "10px" }}>
                            <div style={{ width: "100%", display: "flex" }} >
                                <div style={{ flex: "1 0 auto" }} >
                                    <TextareaAutosize style={{ width: "100%", border: "none", outline: "none", resize: "none", backgroundColor: "transparent", overflow: "hidden", fontStyle: "italic", fontSize: "1em", fontFamily:"Arial" }} id="questionText" name="questionText">{this.props.item.text}</TextareaAutosize>
                                </div>
                                <div style={{display:"flex"}}>
                                    <QuestionButton itemId={this.props.item.id} icon={saveIcon} altText="save" buttonKey="save" doAction={() => {
                                        var newItem = {
                                            id: this.props.item.id,
                                            type: this.props.item.type,
                                            text: document.getElementById('questionText').value,
                                            untypedAnswer: document.getElementById('untypedAnswer').value,
                                            typedAnswers: this.props.item.typedAnswers.map(typedAnswer => typedAnswer.text),
                                            estimatedTrainingTimeSeconds: this.props.item.estimatedTrainingTimeSeconds,
                                            enabled: this.props.item.enabled,
                                            reference: this.props.item.reference
                                        };
                                        return this.props.saveChanges(newItem);
                                    }
                                    } />
                                    <QuestionButton itemId={this.props.item.id} icon={deleteIcon} altText="delete" buttonKey="delete" />
                                    <QuestionButton itemId={this.props.item.id} icon={closeIcon} altText="close" buttonKey="close" doAction={()=>this.props.cancelEdit()} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "table-row"}}>
                        <div style={{ display: "table-cell", padding: "10px" }} >
                            <TextareaAutosize style={{ width: "100%", border: "none", outline: "none", resize: "none", backgroundColor: "transparent", overflow: "hidden", fontStyle: "italic", fontSize: "1em", fontFamily: "Arial" }} id="untypedAnswer" name="untypedAnswer">{this.props.item.untypedAnswer}</TextareaAutosize>
                        </div>
                    </div>
                    <div style={{ display: "table-row"}}>
                        <div style={{ display: "table-cell", padding: "0 5px 0 5px" }} >
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                {this.props.item.typedAnswers.map(ans =>
                                (
                                    <div key={ans.id}
                                        style={{ border: "1px solid black", borderRadius: "5px", margin: "0 5px 10px 5px", padding: "2px",position: "relative" }}
                                        onMouseEnter={() => this.setMouseOnTypedAnswerFlag(ans.id)}
                                        onMouseLeave={() => this.setMouseOnTypedAnswerFlag(null)}
                                    >
                                        <em>{ans.text}</em>
                                        {(this.state.selectedTypedAnswerId == ans.id) && (
                                            <div style={{
                                                position: "absolute",
                                                top: "0",
                                                left: "0",
                                                width: "100%",
                                                height: "100%",
                                                backgroundColor: "rgba(255, 255, 255, 0.7)",
                                                borderRadius: "5px"
                                            }}>
                                            </div>
                                        )
                                        }
                                        {(this.state.selectedTypedAnswerId == ans.id) && (
                                            
                                            <div style={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                            }}>
                                                <a href="#">
                                                    <img src={deleteIcon} alt="Delete the typed answer" width="12px" />
                                                </a>
                                            </div>
                                        )
                                        }
                                    </div>
                                )
                                )}
                                <div style={{ margin: "0 5px 10px 5px", padding: "2px", border: "1px solid black", borderRadius: "5px" }}>
                                    <a href="#">
                                        <img src={addIcon} alt="Add a typed answer" width="12px" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                );
        }
        return result;
    }
}

export default Question;