import React, { Component } from "react";
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [
                // { id: 1, text: "first task" },
                // { id: 2, text: "second task" },
                // { id: 3, text: "third task" },
            ],
        };
    }

    handleClick = (text) => {
        let newTask = [
            { id: (Math.random() * 100).toFixed(5), text: text },
            ...this.state.tasks,
        ];
        this.setState({ tasks: newTask });
    };

    removeTask = (id) => {
        let newTasks = this.state.tasks.filter((obj) => obj.id !== id);

        this.setState({ tasks: newTasks });
    };

    render() {
        return (
            <div>
                <TaskInput handleClick={this.handleClick} />
                <TaskList
                    tasks={this.state.tasks}
                    removeTask={this.removeTask}
                />
            </div>
        );
    }
}
