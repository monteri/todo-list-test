import React from 'react';
import { Link } from "react-router-dom";
import {validateTask} from "../utils/utils";
import {getTodoList, updateTask} from "../api/actions";


class TaskView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      taskText: '',
    };
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
  }

  async componentDidMount() {
    const todoItems = await getTodoList();
    const task = todoItems.filter(item => this.props.match.params.id === item.id.toString())[0];
    this.setState({ taskText: task.name });
  }

  handleTaskChange(e) {
    this.setState({
      taskText: e.target.value,
    });
  }

  async handleUpdateTask(e) {
    e.preventDefault();
    const { taskText } = this.state;
    const errors = validateTask(taskText);
    const errorFields = Object.keys(errors);
    if (errorFields.length) {
      errorFields.forEach(error => {
        console.error(error, ': ', errors[error])
      })
      return;
    }
    await updateTask(this.props.match.params.id, taskText);
  }

  render() {
    const { taskText } = this.state;

    return (
      <>
        <h1 className="mt-5">Страница просмотра задания</h1>
        <form className="my-5">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Введите задание"
            value={taskText}
            onChange={this.handleTaskChange}
          />
          <button
            className="btn btn-outline-primary"
            onClick={this.handleUpdateTask}
          >
            Save changes
          </button>
          <Link
            className="btn btn-danger ms-2"
            to="/"
          >
            Cancel
          </Link>
        </form>
      </>
    );
  }
}

export default TaskView;