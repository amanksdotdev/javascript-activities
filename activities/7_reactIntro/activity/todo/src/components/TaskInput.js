import React, { Component } from "react";

export default class TaskInput extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            inputText: "",
        };
    }

    handleChange = (e) => {
        let val = e.target.value;
        this.setState({ inputText: val });
    };
    render() {
        return (
            <div>
                <input
                    onChange={this.handleChange}
                    value={this.state.inputText}
                    type="text"
                />
                <button
                    onClick={() => {
                        this.props.handleClick(this.state.inputText);
                        this.setState({ inputText: "" });
                    }}
                >
                    Add
                </button>
            </div>
        );
    }
}
