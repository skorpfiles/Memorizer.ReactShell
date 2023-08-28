import React from 'react'
import QuestionButton from './QuestionButton.js';
import closeIcon from '../Icons/close.png';
import deleteIcon from '../Icons/delete.png';
import saveIcon from '../Icons/floppy_save_guardar.png';
import addIcon from '../Icons/add.png';
import TextareaAutosize from 'react-textarea-autosize';
import TypedAnswer from './TypedAnswer.js';
import AddTypedAnswerButton from './AddTypedAnswerButton'

class QuestionInEditMode extends React.Component {
    constructor(props) {
        super(props);
        this.setMouseOnTypedAnswerFlag = this.setMouseOnTypedAnswerFlag.bind(this);
        this.state = {
            selectedTypedAnswerId: null
        }
    }

    setMouseOnTypedAnswerFlag(typedAnswerId) {
        this.setState({ selectedTypedAnswerId: typedAnswerId });
    }

    render() {
        return (
            <div style={{ display: "table", width: "100%", margin: "10px 0px", backgroundColor: "white", fontFamily: "Arial" }}>
                <div style={{ display: "table-row", fontSize: "1.5em", backgroundColor: "#E6E6FA" }}>
                    <div style={{ display: "table-cell", padding: "10px" }}>
                        <div style={{ width: "100%", display: "flex" }} >
                            <div style={{ flex: "1 0 auto" }} >
                                <TextareaAutosize
                                    style={{ width: "100%", border: "none", outline: "none", resize: "none", backgroundColor: "transparent", overflow: "hidden", fontStyle: "italic", fontSize: "1em", fontFamily: "Arial" }}
                                    id="questionText"
                                    name="questionText"
                                    value={this.props.item.text}
                                    onChange={(event) => this.props.handleQuestionTextChange(event)}
                                    placeholder="Type the question."
                                />
                            </div>
                            <div style={{ display: "flex" }}>
                                <select name="questionType" id="questionType" style={{ margin: "0 10px", height: "30px" }} value={this.props.item.type} onChange={(event) => this.props.handleQuestionTypeChange(event)}>
                                    <option value="task">Task</option>
                                    <option value="untypedAnswer">Untyped answer</option>
                                    <option value="typedAnswers">Typed answers</option>
                                    <option value="untypedAndTypedAnswers">Untyped and typed answers</option>
                                </select>
                                <QuestionButton itemId={this.props.item.id} icon={saveIcon} altText="save" buttonKey="save" doAction={() => this.props.saveEditingQuestion()} />
                                <QuestionButton itemId={this.props.item.id} icon={deleteIcon} altText="delete" buttonKey="delete" doAction={() => this.props.deleteQuestion(this.props.item.id)} />
                                <QuestionButton itemId={this.props.item.id} icon={closeIcon} altText="close" buttonKey="close" doAction={() => this.props.cancelEdit()} />
                            </div>
                        </div>
                    </div>
                </div>
                {(this.props.item.type != "task") && (
                    <div style={{ display: "table-row" }}>
                        <div style={{ display: "table-cell", padding: "10px 0" }}>
                            <div style={{ display: "table", width:"100%" }}>
                                {(this.props.item.type == "untypedAnswer" || this.props.item.type == "untypedAndTypedAnswers") && (
                                    <div style={{ display: "table-row" }}>
                                        <div style={{ display: "table-cell", padding: "0 10px" }} >
                                            <TextareaAutosize
                                                style={{ width: "100%", border: "none", outline: "none", resize: "none", backgroundColor: "transparent", overflow: "hidden", fontStyle: "italic", fontSize: "1em", fontFamily: "Arial" }}
                                                id="untypedAnswer"
                                                name="untypedAnswer"
                                                value={this.props.item.untypedAnswer}
                                                onChange={(event) => this.props.handleQuestionUntypedAnswerChange(event)}
                                                placeholder="Type the untyped answer."
                                            />
                                        </div>
                                    </div>
                                )}
                                {(this.props.item.type == "untypedAndTypedAnswers") && (
                                    <div style={{ display: "table-row" }}>
                                        <div style={{ display: "table-cell", padding: "5px 0" }}></div>
                                    </div>
                                )}
                                {(this.props.item.type == "typedAnswers" || this.props.item.type == "untypedAndTypedAnswers") && (
                                    <div style={{ display: "table-row" }}>
                                        <div style={{ display: "table-cell", padding: "0 5px" }} >
                                            <div style={{ display: "flex", flexWrap: "wrap", rowGap: "5px" }}>
                                                {this.props.item.typedAnswers.map(ans =>
                                                (
                                                    <TypedAnswer
                                                        key={ans.id}
                                                        id={ans.id}
                                                        text={ans.text}
                                                        isInEditorMode={true}
                                                        deleteTypedAnswer={this.props.deleteTypedAnswer}
                                                    />
                                                )
                                                )}
                                                <AddTypedAnswerButton
                                                    addTypedAnswer={this.props.addTypedAnswer}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <div style={{ display: "table-row", backgroundColor: "#E6E6FA" }}>
                    <div style={{ display: "table-cell", padding: "10px", fontSize: "1em" }}>
                        <div style={{ display: "table", width: "100%" }}>
                            <div style={{ display: "table-row" }}>
                                <div style={{ display: "flex", columnGap: "5px", verticalAlign: "center", alignItems: "stretch" }}>
                                    <div>
                                        <label>Reference:</label>
                                    </div>
                                    <div style={{ flexBasis: "auto", width: "100%" }}>
                                        <TextareaAutosize
                                            style={{ width: "100%", resize: "none", overflow: "hidden", fontFamily: "Arial" }}
                                            id="reference"
                                            name="reference"
                                            value={this.props.item.reference}
                                            onChange={(event) => this.props.handleReferenceChange(event)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: "table-row" }}>
                                <div style={{ width: "100%", display: "flex", flexWrap: "wrap", verticalAlign: "center", alignItems: "baseline", columnGap: "10px", padding: "10px 0 0 0" }}>
                                    <div>
                                        <input type="checkbox" id="questionEnabled" checked={this.props.item.enabled} onChange={this.props.handleEnabledCheckboxChange} />
                                        <label>Enabled</label>
                                    </div>
                                    <div>
                                        <label>ETT:</label>
                                        <input type="number" style={{ width: "100px" }} id="estimatedTrainingTime" value={this.props.item.estimatedTrainingTimeSeconds} onChange={this.props.handleEttChange} />
                                    </div>
                                    {(this.props.item.myStatus != null) &&
                                        (
                                            <div>
                                                <input type="checkbox" id="questionIsNew" />
                                                <label>New</label>
                                            </div>
                                        )
                                    }
                                    {(this.props.item.myStatus != null) &&
                                        (
                                            <div>
                                                <label>R:</label>
                                                <input type="number" style={{ width: "50px" }} id="rating" />
                                            </div>
                                        )
                                    }
                                    {(this.props.item.myStatus != null) &&
                                        (
                                            <div>
                                                <label>PP:</label>
                                                <input type="number" style={{ width: "50px" }} id="penaltyPoints" />
                                            </div>
                                        )
                                    }
                                    {(this.props.item.myStatus != null) &&
                                        (
                                            <div>ATT: {this.props.item.averageTrainingTimeSeconds ?? "-"}</div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionInEditMode;