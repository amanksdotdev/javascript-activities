import React, { Component } from "react";

export default class Task extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={this.props.id}>
                <span>{this.props.text}</span> &nbsp;
                <button onClick={() => this.props.removeTask(this.props.id)}>
                    X
                </button>
            </div>
        );
    }
}
