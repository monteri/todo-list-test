import React from 'react';
import { Link } from "react-router-dom";
import { removeTask } from "../api/actions";


class TodoItem extends React.Component {

  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleDelete(e) {
    e.preventDefault();
    await removeTask(this.props.id);
    this.props.updateTodoList();
  }

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>
          <Link
            className="btn btn-outline-info"
            to={`/tasks/${this.props.id}`}
          >
            Открыть
          </Link>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.handleDelete}
          >
            Удалить
          </button>
        </td>
      </tr>
    );
  }
}

export default TodoItem;