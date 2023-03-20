import React from 'react';
import QuestionButton from './QuestionButton.js';
import editIcon from './edit.png';
import closeIcon from './close.png';
import deleteIcon from './delete.png';
import saveIcon from './floppy_save_guardar.png';
import addIcon from './add.png';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuidv4 } from 'uuid';

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.setMouseOnElementFlag = this.setMouseOnElementFlag.bind(this);
        this.setMouseOnTypedAnswerFlag = this.setMouseOnTypedAnswerFlag.bind(this);
        this.addTypedAnswer = this.addTypedAnswer.bind(this);
        this.deleteTypedAnswer = this.deleteTypedAnswer.bind(this);
        this.handleEnabledCheckboxChange = this.handleEnabledCheckboxChange.bind(this);
        this.handleEttChange = this.handleEttChange.bind(this);
        this.handleReferenceChange = this.handleReferenceChange.bind(this);
        this.state = {
            mouseOnElement: false,
            itemWithChanges: null,
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

    addTypedAnswer() {
        let newTypedAnswerText = prompt("Type the answer text", "");
        if (newTypedAnswerText != null && newTypedAnswerText != "") {
            this.setState(prevState => ({
                itemWithChanges: {
                    ...prevState.itemWithChanges,
                    typedAnswers: [
                        ...prevState.itemWithChanges.typedAnswers,
                        {
                            id: uuidv4(),
                            text: newTypedAnswerText
                        }
                    ]
                }
            }));
        }
    }

    deleteTypedAnswer(id) {
        this.setState(prevState => ({
            itemWithChanges: {
                ...prevState.itemWithChanges,
                typedAnswers: prevState.itemWithChanges.typedAnswers.filter(ans => ans.id != id)
                }
            }))
    }

    handleEnabledCheckboxChange(event) {
        this.setState(prevState=>({
            itemWithChanges: {
                ...prevState.itemWithChanges,
                enabled:event.target.checked
            }
        }));
    }

    handleEttChange(event) {
        this.setState(prevState => ({
            itemWithChanges: {
                ...prevState.itemWithChanges,
                estimatedTrainingTimeSeconds: event.target.value
            }
        }));
    }

    handleReferenceChange(event) {
        this.setState(prevState => ({
            itemWithChanges: {
                ...prevState.itemWithChanges,
                reference: event.target.value
            }
        }));
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
                                        <QuestionButton itemId={this.props.item.id} doAction={() =>
                                            {
                                                this.setState({
                                                    itemWithChanges: {
                                                        id: this.props.item.id,
                                                        type: this.props.item.type,
                                                        text: this.props.item.text,
                                                        untypedAnswer: this.props.item.untypedAnswer,
                                                        typedAnswers: this.props.item.typedAnswers,
                                                        estimatedTrainingTimeSeconds: this.props.item.estimatedTrainingTimeSeconds,
                                                        enabled: this.props.item.enabled,
                                                        reference: this.props.item.reference
                                                    }
                                                });
                                                this.props.doEdit(this.props.item.id);
                                            }
                                        } icon={editIcon} altText="edit" buttonKey="edit" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "table-row" }}>
                        <div style={{ display: "table-cell", padding:"10px 0" }}>
                            <div style={{display:"table"}}>
                                <div style={{ display: "table-row" }}>
                                    {(this.props.item.type == "untypedAnswer" || this.props.item.type == "untypedAndTypedAnswers") && (
                                        <div style={{ display: "table-cell", padding:"0 10px" }} >
                                            <em>{this.props.item.untypedAnswer}</em>
                                        </div>
                                    )}
                                    {this.props.item.type == "task" && (
                                        <div style={{ display: "table-cell", padding: "0 10px" }} >
                                            <em><span style={{ color: "gray" }} >Task</span></em>
                                        </div>
                                    )}
                                </div>
                                {(this.props.item.type == "untypedAndTypedAnswers") && (
                                    <div style={{ display: "table-row" }}>
                                        <div style={{ display: "table-cell", padding: "5px 0" }}></div>
                                    </div>
                                )}
                                {((this.props.item.type == "typedAnswers" || this.props.item.type=="untypedAndTypedAnswers") && this.props.item.typedAnswers != null && this.props.item.typedAnswers.length != 0) && (
                                    <div style={{ display: "table-row" }}>
                                        <div style={{ display: "table-cell", padding: "0 5px" }} >
                                            <div style={{ display: "flex", flexWrap: "wrap", rowGap: "5px" }}>
                                                {this.props.item.typedAnswers.map(ans =>
                                                (
                                                    <div key={ans.id} style={{ border: "1px solid black", borderRadius: "5px", margin: "0 5px 0 5px", padding: "2px" }}>
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
                        </div>
                    </div>
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
                                    <TextareaAutosize style={{ width: "100%", border: "none", outline: "none", resize: "none", backgroundColor: "transparent", overflow: "hidden", fontStyle: "italic", fontSize: "1em", fontFamily: "Arial" }} id="questionText" name="questionText">{this.state.itemWithChanges.text}</TextareaAutosize>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <select name="questionType" id="questionType" style={{ margin: "0 10px", height: "30px" }} value={this.state.itemWithChanges.type} onChange={(event) =>
                                        this.setState(prevState => ({
                                            itemWithChanges: {
                                                ...prevState.itemWithChanges,
                                                type: event.target.value
                                            }
                                        })
                                        )
                                    }>
                                        <option value="task">Task</option>
                                        <option value="untypedAnswer">Untyped answer</option>
                                        <option value="typedAnswers">Typed answers</option>
                                        <option value="untypedAndTypedAnswers">Untyped and typed answers</option>
                                    </select>
                                    <QuestionButton itemId={this.state.itemWithChanges.id} icon={saveIcon} altText="save" buttonKey="save" doAction={() => {
                                        var newItem = {
                                            id: this.state.itemWithChanges.id,
                                            type: this.state.itemWithChanges.type,
                                            text: document.getElementById('questionText').value,
                                            untypedAnswer: document.getElementById('untypedAnswer') != null ? document.getElementById('untypedAnswer').value : this.state.itemWithChanges.untypedAnswer,
                                            typedAnswers: this.state.itemWithChanges.typedAnswers.map(typedAnswer => typedAnswer.text),
                                            estimatedTrainingTimeSeconds: this.state.itemWithChanges.estimatedTrainingTimeSeconds,
                                            enabled: this.state.itemWithChanges.enabled,
                                            reference: this.state.itemWithChanges.reference
                                        };
                                        return this.props.saveChanges(newItem);
                                    }
                                    } />
                                    <QuestionButton itemId={this.state.itemWithChanges.id} icon={deleteIcon} altText="delete" buttonKey="delete" />
                                    <QuestionButton itemId={this.state.itemWithChanges.id} icon={closeIcon} altText="close" buttonKey="close" doAction={()=>this.props.cancelEdit()} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {(this.state.itemWithChanges.type != "task") && (
                        <div style={{ display: "table-row" }}>
                            <div style={{ display: "table-cell", padding: "10px 0" }}>
                                <div style={{ display: "table" }}>
                                    {(this.state.itemWithChanges.type == "untypedAnswer" || this.state.itemWithChanges.type == "untypedAndTypedAnswers") && (
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell", padding: "0 10px" }} >
                                                <TextareaAutosize style={{ width: "100%", border: "none", outline: "none", resize: "none", backgroundColor: "transparent", overflow: "hidden", fontStyle: "italic", fontSize: "1em", fontFamily: "Arial" }} id="untypedAnswer" name="untypedAnswer">{this.state.itemWithChanges.untypedAnswer}</TextareaAutosize>
                                            </div>
                                        </div>
                                    )}
                                    {(this.state.itemWithChanges.type == "untypedAndTypedAnswers") && (
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell", padding: "5px 0" }}></div>
                                        </div>
                                    )}
                                    {(this.state.itemWithChanges.type == "typedAnswers" || this.state.itemWithChanges.type == "untypedAndTypedAnswers") && (
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell", padding: "0 5px" }} >
                                                <div style={{ display: "flex", flexWrap: "wrap", rowGap:"5px" }}>
                                                    {this.state.itemWithChanges.typedAnswers.map(ans =>
                                                    (
                                                        <div key={ans.id}
                                                            style={{ border: "1px solid black", borderRadius: "5px", margin: "0 5px 0 5px", padding: "2px", position: "relative" }}
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
                                                                }}
                                                                    onClick={() => this.deleteTypedAnswer(ans.id)}
                                                                >
                                                                    <a href="#">
                                                                        <img src={deleteIcon} alt="Delete the typed answer" width="12px" />
                                                                    </a>
                                                                </div>
                                                            )
                                                            }
                                                        </div>
                                                    )
                                                    )}
                                                    <div style={{ margin: "0 5px 0 5px", padding: "2px", border: "1px solid black", borderRadius: "5px" }} onClick={() => this.addTypedAnswer()}>
                                                        <a href="#">
                                                            <img src={addIcon} alt="Add a typed answer" width="12px" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <div style={{ display: "table-row", backgroundColor:"#E6E6FA" }}>
                        <div style={{ display: "table-cell", padding: "10px", fontSize: "1em" }}>
                            <div style={{ display: "table", width:"100%" }}>
                                <div style={{ display: "table-row" }}>
                                    <div style={{ display: "flex", columnGap: "5px", verticalAlign: "center", alignItems:"stretch" }}>
                                        <div>
                                            <label for="reference">Reference:</label>
                                        </div>
                                        <div style={{ flexBasis: "auto", width: "100%" }}>
                                            <TextareaAutosize style={{ width: "100%", resize: "none", overflow: "hidden", fontFamily: "Arial" }} id="reference" name="reference" value={this.state.itemWithChanges.reference} onChange={this.handleReferenceChange}></TextareaAutosize>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: "table-row" }}>
                                    <div style={{ width: "100%", display: "flex", flexWrap: "wrap", verticalAlign: "center", alignItems: "baseline", columnGap: "10px", padding: "10px 0 0 0" }}>
                                        <div>
                                            <input type="checkbox" id="questionEnabled" checked={this.state.itemWithChanges.enabled} onChange={this.handleEnabledCheckboxChange} />
                                            <label for="questionEnabled">Enabled</label>
                                        </div>
                                        <div>
                                            <label for="estimatedTrainingTime">ETT:</label>
                                            <input type="number" style={{ width: "100px" }} id="estimatedTrainingTime" value={this.state.itemWithChanges.estimatedTrainingTimeSeconds} onChange={this.handleEttChange} />
                                        </div>
                                        {(this.state.itemWithChanges.myStatus != null) &&
                                            (
                                                <div>
                                                    <input type="checkbox" id="questionIsNew" />
                                                    <label for="questionIsNew">New</label>
                                                </div>
                                            )
                                        }
                                        {(this.state.itemWithChanges.myStatus != null) &&
                                            (
                                                <div>
                                                    <label for="rating">R:</label>
                                                    <input type="number" style={{ width: "50px" }} id="rating" />
                                                </div>
                                            )
                                        }
                                        {(this.state.itemWithChanges.myStatus != null) &&
                                            (
                                                <div>
                                                    <label for="penaltyPoints">PP:</label>
                                                    <input type="number" style={{ width: "50px" }} id="penaltyPoints" />
                                                </div>
                                            )
                                        }
                                        {(this.state.itemWithChanges.myStatus != null) &&
                                            (
                                                <div>ATT: {this.state.itemWithChanges.averageTrainingTimeSeconds ?? "-"}</div>
                                            )
                                        }
                                    </div>
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