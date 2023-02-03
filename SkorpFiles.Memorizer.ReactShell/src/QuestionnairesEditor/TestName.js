import React from 'react';
import EditButton from './EditButton.js';

class TestName extends React.Component {
    constructor(props) {
        super(props);
        this.setIsShown = this.setIsShown.bind(this);
        this.state = {
            isShown: false
        }
    }

    setIsShown(param) {
        this.setState({ isShown: param });
    }

    render() {
        return
        (
            <div style={{ display: "table", width: "100%", margin: "10px 0px", backgroundColor: "#6495ed", fontFamily: "Arial" }}
                onMouseEnter={() => this.setIsShown(true)}
                onMouseLeave={() => this.setIsShown(false)}
            >
                <div style={{ display: "table-row", fontSize: "1.5em" }}>
                    <div style={{ display: "table-cell", padding: "10px" }}>
                        <div style={{ width: "100%", display: "flex" }} >
                            <div style={{ flex: "1 0 auto" }} >
                                <em>{this.props.item.text}</em>
                            </div>
                            <div>
                                {this.state.isShown && (
                                    <EditButton itemId={this.props.item.id} isShown={this.state.isShown} />
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
        )
    }
}

export default TestName;