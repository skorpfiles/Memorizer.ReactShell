import React from 'react'
import deleteIcon from '../Icons/delete.png';
import TypedAnswerSectionElement from './TypedAnswerSectionElement';

class TypedAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
        this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
        this.state = {
            mouseOnComponent: false
        }
    }

    handleOnMouseEnter() {
        this.setState({
            mouseOnComponent: true
        });
    }

    handleOnMouseLeave() {
        this.setState({
            mouseOnComponent: false
        });
    }

    render() {
        return (
            <TypedAnswerSectionElement>
                <div
                    key={this.props.id}
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                >
                    <em>{this.props.text}</em>
                    {(this.props.isInEditorMode && this.state.mouseOnComponent) && (
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
                    {(this.props.isInEditorMode && this.state.mouseOnComponent) && (

                        <div style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                            onClick={() => this.props.deleteTypedAnswer(this.props.id)}
                        >
                            <a href="#">
                                <img src={deleteIcon} alt="Delete the typed answer" width="12px" />
                            </a>
                        </div>
                    )
                    }
                </div>
            </TypedAnswerSectionElement>
        )
    }
}

export default TypedAnswer;