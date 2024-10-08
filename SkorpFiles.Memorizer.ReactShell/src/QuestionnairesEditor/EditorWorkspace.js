import React from 'react';
import QuestionnairesList from './QuestionnairesList';
import QuestionnaireDetails from './QuestionnaireDetails';
import { CallApi } from '../GlobalUtilities';

class EditorWorkspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            currentQuestionnaire: null,
            isInEditorMode: false,
            listIsLoading: true,
            listIsLoaded: false,
            listIsLoadedError: false,
            listLoadedErrorText: '',
            scrollPositionIsOnKeeping: false,
        };
        this.setEditorMode = this.setEditorMode.bind(this);
        this.addQuestionnaire = this.addQuestionnaire.bind(this);
        this.renameCurrentQuestionnaire = this.renameCurrentQuestionnaire.bind(this);
        this.deleteCurrentQuestionnaire = this.deleteCurrentQuestionnaire.bind(this);
        this.refresh = this.refresh.bind(this);
        this.switchQuestionnaire = this.switchQuestionnaire.bind(this);

        this.listRef = React.createRef();
        this.scrollPosition = 0;
        this.restoreScrollPosition = this.restoreScrollPosition.bind(this);
        this.saveScrollPosition = this.saveScrollPosition.bind(this);
    }

    async componentDidMount() {
        await this.refresh();
    }

    restoreScrollPosition() {
        if (this.state.scrollPositionIsOnKeeping) {
            this.setState({
                scrollPositionIsOnKeeping: false
            });
            setTimeout(() => {
                window.scrollTo(0, this.scrollPosition);
            }, 0);
        }
    }

    saveScrollPosition() {
        this.setState({
            scrollPositionIsOnKeeping: true
        });
        this.scrollPosition = window.scrollY;
    }

    render() {
        let questionnairesListField = (<QuestionnairesList
            ref={this.listRef}
            items={this.state.items}
            accessToken={this.props.accessToken}
            switchItem={(newItem) => this.switchQuestionnaire(newItem)}
            isInEditorMode={this.state.isInEditorMode}
            currentQuestionnaire={this.state.currentQuestionnaire}
            dataIsLoading={this.state.listIsLoading}
            dataIsLoaded={this.state.listIsLoaded}
            isLoadedError={this.state.listIsLoadedError}
            loadedErrorText={this.state.listLoadedErrorText}
            addQuestionnaire={this.addQuestionnaire}
            renameCurrentQuestionnaire={this.renameCurrentQuestionnaire}
            deleteCurrentQuestionnaire={this.deleteCurrentQuestionnaire}
        />);

        let workspaceField;
        if (this.state.currentQuestionnaire != null)
            workspaceField = (<QuestionnaireDetails
                currentItem={this.state.currentQuestionnaire}
                accessToken={this.props.accessToken}
                isInEditorMode={this.state.isInEditorMode}
                setEditorMode={this.setEditorMode}
                saveScrollPosition={this.saveScrollPosition}
                restoreScrollPosition={this.restoreScrollPosition}
                userId={this.props.userId}
            />);
        else
            workspaceField = (<label style={{ color: "white" }}>Nothing is selected</label>);

        return (
            <div style={{ display: "flex", height:"100%" }}>
                <div style={{ flex: "0 1 500px", backgroundColor: "#000080", color:"white", padding:"10px" }}>
                    {questionnairesListField}
                </div>

                <div style={{ flex:"0 1 100%", backgroundColor: "#0000CD", padding: "10px" }}>
                    {workspaceField}
                </div>
            </div>
        );
    }

    switchQuestionnaire(newItem) {
        if (!this.state.isInEditorMode) {
            this.setState({
                currentQuestionnaire: newItem
            });
        }
    }

    setEditorMode(val) {
        this.setState({
            isInEditorMode: val
        });
    }

    async refresh() {
        try {
            const response =
                await CallApi("/Repository/Questionnaires", "GET", this.props.accessToken);

            if (response.ok) {
                const result = await response.json();

                this.setState({
                    items: result.questionnaires,
                    listIsLoading: false,
                    listIsLoaded: true,
                    listIsLoadedError: false,
                    listLoadedErrorText: ''
                });
            }
            else {
                const result = await response.json();

                this.setState({
                    items: [],
                    listIsLoading: false,
                    listIsLoaded: false,
                    listIsLoadedError: true,
                    listLoadedErrorText: `${response.status} ${result.errorText}`
                });
            }
        }
        catch (error) {
            console.log(error);
            this.setState({
                items: [],
                listIsLoading: false,
                listIsLoaded: false,
                listIsLoadedError: true,
                listLoadedErrorText: "Error. Unable to get questionnaires."
            });
        }
    }

    async addQuestionnaire() {
        const newQuestionnaireName = prompt("Type the questionnaire name", "");
        if (newQuestionnaireName != null && newQuestionnaireName != "") {
            const newItem = {
                name: newQuestionnaireName,
                availability: "private"
            };

            try {
                const response_addQuestionnaire = await CallApi("/Repository/Questionnaire", "PUT", this.props.accessToken, JSON.stringify(newItem));

                if (response_addQuestionnaire.ok) {
                    await this.refresh();
                }
                else {
                    const result_addQuestionnaire = await response_addQuestionnaire.json();
                    alert(`${response_addQuestionnaire.status} ${result_addQuestionnaire.errorText}`);
                }
            }
            catch (error) {
                console.log(error);
                alert("Error: Unable to save changes.");
            }
        }
    }

    async renameCurrentQuestionnaire() {
        const currentQuestionnaireId = this.state.currentQuestionnaire?.id;
        if (currentQuestionnaireId != null) {
            const newQuestionnaireName = prompt("Type the new questionnaire name", this.state.currentQuestionnaire.name);

            const updatedItem = {
                id: this.state.currentQuestionnaire.id,
                name: newQuestionnaireName
            };

            try {
                const response = await CallApi("/Repository/Questionnaire", "POST", this.props.accessToken, JSON.stringify(updatedItem));
                if (response.ok) {

                    this.setState(prevState => ({
                        currentQuestionnaire: {
                            ...prevState.currentQuestionnaire,
                            name: updatedItem.name
                        }
                    }))

                    await this.refresh();
                }
                else {
                    const result = await response.json();

                    this.setState({
                        editingQuestionError: true,
                        editingQuestionErrorText: `${response.status} ${result.errorText}`
                    });
                }
            }
            catch (error) {
                console.log(error);
                this.setState({
                    editingQuestionError: true,
                    editingQuestionErrorText: "Error: Unable to save changes."
                });
            }
        }
    }

    async deleteCurrentQuestionnaire() {
        const currentQuestionnaireId = this.state.currentQuestionnaire?.id;
        if (currentQuestionnaireId != null) {
            const confirmed = window.confirm("Do you really want to delete the questionnaire?");
            if (confirmed) {
                try {
                    this.switchQuestionnaire(null);
                    const response = await CallApi("/Repository/Questionnaire/" + currentQuestionnaireId, "DELETE", this.props.accessToken);
                    if (response.ok) {
                        this.setEditorMode(false);
                        this.setState({
                            editingQuestionId: null,
                            editingQuestionError: false,
                            editingQuestionErrorText: '',
                            addingQuestionEnabled: false
                        });
                        await this.refresh();
                    }
                    else {
                        const result = await response.json();

                        this.setState({
                            editingQuestionError: true,
                            editingQuestionErrorText: `${response.status} ${result.errorText}`
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                    this.setState({
                        editingQuestionError: true,
                        editingQuestionErrorText: "Error: Unable to save changes."
                    });
                }
            }
        }
    }
}

export default EditorWorkspace;