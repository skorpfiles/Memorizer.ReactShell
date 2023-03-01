import React from 'react';
import QuestionButton from './QuestionButton.js';
import editIcon from './edit.png';
import closeIcon from './close.png';
import deleteIcon from './delete.png';
import saveIcon from './floppy_save_guardar.png';

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.setMouseOnElementFlag = this.setMouseOnElementFlag.bind(this);
        this.state = {
            mouseOnElement: false
        }
    }

    setMouseOnElementFlag(param) {
        if ((param == true && !this.props.controlsBlocked) || param == false)
            this.setState({ mouseOnElement: param });
    }

    render() {
        var result;

        if (!this.props.isInEditorMode) {
            result =
                (
                <div style={{ display: "table", width: "100%", margin: "10px 0px", backgroundColor: "#6495ed", fontFamily: "Arial" }}
                    onMouseEnter={() => this.setMouseOnElementFlag(true)}
                    onMouseLeave={() => this.setMouseOnElementFlag(false)}
                >
                    <div style={{ display: "table-row", fontSize: "1.5em" }}>
                        <div style={{ display: "table-cell", padding: "10px" }}>
                            <div style={{ width: "100%", display: "flex" }} >
                                <div style={{ flex: "1 0 auto" }} >
                                    <em>{this.props.item.text}</em>
                                </div>
                                <div>
                                    {this.state.mouseOnElement && (
                                    <QuestionButton itemId={this.props.item.id} doAction={this.props.doEdit} icon={editIcon} altText="edit" buttonKey="edit" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "table-row", backgroundColor: "#87cefa" }}>
                        <div style={{ display: "table-cell", padding: "10px" }} >
                            <em>{this.props.item.untypedAnswer}</em>
                        </div>
                    </div>
                    {(this.props.item.typedAnswers != null && this.props.item.typedAnswers.length != 0) && (
                        <div style={{ display: "table-row", backgroundColor: "#87cefa" }}>
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
                <div style={{ display: "table", width: "100%", margin: "10px 0px", backgroundColor: "#E6E6FA", fontFamily: "Arial" }}
                    onMouseEnter={() => this.setMouseOnElementFlag(true)}
                    onMouseLeave={() => this.setMouseOnElementFlag(false)}
                >
                    <div style={{ display: "table-row", fontSize: "1.5em" }}>
                        <div style={{ display: "table-cell", padding: "10px" }}>
                            <div style={{ width: "100%", display: "flex" }} >
                                <div style={{ flex: "1 0 auto" }} >
                                    <em>{this.props.item.text}</em>
                                </div>
                                <div style={{display:"flex"}}>
                                    <QuestionButton itemId={this.props.item.id} icon={saveIcon} altText="save" buttonKey="save" />
                                    <QuestionButton itemId={this.props.item.id} icon={deleteIcon} altText="delete" buttonKey="delete" />
                                    <QuestionButton itemId={this.props.item.id} icon={closeIcon} altText="close" buttonKey="close" doAction={this.props.cancelEdit} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "table-row", backgroundColor: "white" }}>
                        <div style={{ display: "table-cell", padding: "10px" }} >
                            <em>{this.props.item.untypedAnswer}</em>
                        </div>
                    </div>
                    {(this.props.item.typedAnswers != null && this.props.item.typedAnswers.length != 0) && (
                    <div style={{ display: "table-row", backgroundColor: "white" }}>
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
        return result;
    }
}

export default Question;