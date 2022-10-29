import React from "react";

import TodoItem from "../components/TodoItem";
import { validateTask } from "../utils/utils";
import { addTask, getTodoList } from "../api/actions";

import './Dashboard.css';


class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      todoItems: [],
      taskText: '',
    }
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.updateTodoList = this.updateTodoList.bind(this);
  }

  async updateTodoList() {
    const todoItems = await getTodoList();
    this.setState({ todoItems })
  }

  componentDidMount() {
    this.updateTodoList();
  }

  async handleAddTask(e) {
    e.preventDefault();
    const { taskText } = this.state;
    const errors = validateTask(taskText);
    const errorFields = Object.keys(errors);
    if (errorFields.length) {
      errorFields.forEach(error => {
        console.error(error, ': ', errors[error]);
      });
      return;
    }
    await addTask(taskText);
    this.updateTodoList();
    this.setState({ taskText: '' });
  }

  handleTaskChange(e) {
    this.setState({
      taskText: e.target.value,
    })
  }

  render() {
    const { taskText, todoItems } = this.state;

    return (
      <>
        <h1 className="mt-5">TODO LIST</h1>

        <form className="todo-list__add-form my-5">
          <input
            className="form-control"
            type="text"
            placeholder="Введите задание"
            value={taskText}
            onChange={this.handleTaskChange}
          />
          <button
            className="btn btn-outline-primary ms-2"
            onClick={this.handleAddTask}
          >
            Добавить
          </button>
        </form>

        {!!todoItems.length && (
          <table className="table">
            <thead>
              <tr>
                <th>Задание</th>
                <th>Просмотр на новой странице</th>
                <th>Удаление</th>
              </tr>
            </thead>
            <tbody>
              {todoItems.map(item => (
                <TodoItem
                  key={item.id}
                  updateTodoList={this.updateTodoList}
                  {...item}
                />
              ))}
            </tbody>
          </table>
        )}

        <div className="alert alert-info mt-5" role="alert">
          <h4 className="alert-heading">Внимание!</h4>
          <p>Ваш TODO LIST будет автоматически очищаться раз в 2 минуты</p>
        </div>
      </>
    );
  }
}

export default Dashboard;