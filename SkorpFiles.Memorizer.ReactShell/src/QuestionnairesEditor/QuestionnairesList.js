import React from 'react';

class QuestionnairesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    componentDidMount() {
        fetch("https://localhost:7205/Account/Token",
            {
                method: "POST",
                body: JSON.stringify({ login, password })
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }

    render() {
        if (this.state.DataIsLoaded)
            return (<label>Data is loading...</label>);
        else
            return (
                <ul>
                    {this.state.items.map(item => (
                        <li key={item.id}>{item.username}</li>
                    ))}
                </ul>
            );
    }
}

export default QuestionnairesList;