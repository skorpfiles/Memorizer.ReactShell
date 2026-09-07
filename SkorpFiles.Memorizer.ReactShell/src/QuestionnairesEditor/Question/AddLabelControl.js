import React from 'react';
import TypedAnswerSectionElement from './TypedAnswerSectionElement';

class AddLabelControl extends React.Component {
    static maxSuggestions = 20;

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.state = {
            inputValue: '',
            showDropdown: false
        }
    }

    getSuggestions() {
        const typedValue = this.state.inputValue.trim().toLowerCase();
        const currentLabels = this.props.currentLabels ?? [];
        return (this.props.labelsForQuestionnaire ?? [])
            .filter(label => !currentLabels.includes(label) && (typedValue === '' || label.toLowerCase().startsWith(typedValue)))
            .slice(0, AddLabelControl.maxSuggestions);
    }

    commitLabel(labelName) {
        const trimmedLabelName = labelName.trim();
        if (trimmedLabelName !== '') {
            this.props.addLabel(trimmedLabelName);
        }
        this.setState({
            inputValue: '',
            showDropdown: false
        });
    }

    handleInputChange(event) {
        this.setState({
            inputValue: event.target.value,
            showDropdown: true
        });
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            this.commitLabel(this.state.inputValue);
        } else if (event.key === "Escape") {
            this.setState({
                inputValue: '',
                showDropdown: false
            });
        }
    }

    handleFocus() {
        this.setState({ showDropdown: true });
    }

    handleBlur() {
        setTimeout(() => this.setState({ showDropdown: false }), 150);
    }

    render() {
        const suggestions = this.state.showDropdown ? this.getSuggestions() : [];
        return (
            <TypedAnswerSectionElement>
                <div style={{ position: "relative" }}>
                    <input
                        type="text"
                        style={{ display: "block", border: "none", outline: "none", backgroundColor: "transparent", fontSize: "1em", fontFamily: "Open Sans, sans-serif", width: "120px", padding: "0", margin: "0", lineHeight: "normal", verticalAlign: "top" }}
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleKeyDown}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        placeholder="Add a label"
                    />
                    {suggestions.length > 0 && (
                        <div style={{
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            zIndex: "1",
                            backgroundColor: "white",
                            border: "1px solid black",
                            borderRadius: "5px",
                            minWidth: "150px",
                            maxHeight: "150px",
                            overflowY: "auto"
                        }}>
                            {suggestions.map(label => (
                                <div
                                    key={label}
                                    style={{ padding: "3px 6px", cursor: "pointer", whiteSpace: "nowrap" }}
                                    onMouseDown={(event) => {
                                        event.preventDefault();
                                        this.commitLabel(label);
                                    }}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </TypedAnswerSectionElement>
        )
    }
}

export default AddLabelControl;
