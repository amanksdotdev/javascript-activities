import React, { Component } from "react";
import Task from "./Task";

export default class TaskList extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.tasks.map((taskObj) => (
                    <Task
                        key={taskObj.id}
                        id={taskObj.id}
                        text={taskObj.text}
                        removeTask={this.props.removeTask}
                    />
                ))}
            </div>
        );
    }
}
