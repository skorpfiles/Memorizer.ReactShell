import React from 'react'
import QuestionButton from './QuestionButton.js';
import TypedAnswer from './TypedAnswer'
import editIcon from '../Icons/edit.png';
import MultilineText from '../../MultilineText.jsx';

class QuestionInDisplayMode extends React.Component {
    constructor(props) {
        super(props);
        this.setMouseOnElementFlag = this.setMouseOnElementFlag.bind(this);
        this.state = {
            mouseOnElement: false
        }
    }

    async componentDidMount() {
        this.props.restoreScrollPosition();
    }

    setMouseOnElementFlag(param) {
        if ((param == true && !this.props.controlsBlocked) || param == false)
            this.setState({ mouseOnElement: param });
    }

    render() {
        return (
            <div style={{ display: "table", width: "100%", margin: "10px 0px", backgroundColor: "#87cefa", fontFamily: "Open Sans, sans-serif" }}
                onMouseEnter={() => this.setMouseOnElementFlag(true)}
                onMouseLeave={() => this.setMouseOnElementFlag(false)}
            >
                <div style={{ display: "table-row", fontSize: "1.5em", backgroundColor: "#6495ed" }}>
                    <div style={{ display: "table-cell", padding: "10px" }}>
                        <div style={{ width: "100%", display: "flex" }} >
                            <div style={{ flex: "1 0 auto" }} >
                                <MultilineText text={this.props.item.text} />
                            </div>
                            <div>
                                {this.state.mouseOnElement && (
                                    <QuestionButton itemId={this.props.item.id} doAction={() => this.props.startEditingQuestion(this.props.item)} icon={editIcon} altText="edit" buttonKey="edit" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: "table-row" }}>
                    <div style={{ display: "table-cell", padding: "10px 0" }}>
                        <div style={{ display: "table" }}>
                            <div style={{ display: "table-row" }}>
                                {(this.props.item.type === "untypedAnswer" || this.props.item.type === "untypedAndTypedAnswers") && (
                                    <div style={{ display: "table-cell", padding: "0 10px" }} >
                                        <MultilineText text={this.props.item.untypedAnswer} />
                                    </div>
                                )}
                                {this.props.item.type === "task" && (
                                    <div style={{ display: "table-cell", padding: "0 10px" }} >
                                        <span style={{ color: "gray" }} >Task</span>
                                    </div>
                                )}
                            </div>
                            {(this.props.item.type === "untypedAndTypedAnswers") && (
                                <div style={{ display: "table-row" }}>
                                    <div style={{ display: "table-cell", padding: "5px 0" }}></div>
                                </div>
                            )}
                            {((this.props.item.type === "typedAnswers" || this.props.item.type === "untypedAndTypedAnswers") && this.props.item.typedAnswers != null && this.props.item.typedAnswers.length !== 0) && (
                                <div style={{ display: "table-row" }}>
                                    <div style={{ display: "table-cell", padding: "0 5px" }} >
                                        <div style={{ display: "flex", flexWrap: "wrap", rowGap: "5px" }}>
                                            {this.props.item.typedAnswers.map(ans => (
                                                <TypedAnswer
                                                    key={ans.id}
                                                    id={ans.id}
                                                    text={ans.text}
                                                    isInEditorMode={false}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionInDisplayMode;